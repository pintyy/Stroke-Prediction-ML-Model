from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np


app = FastAPI(title="Stroke Prediction API")

# Allow local frontend to call the API from a browser.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:5500",
        "http://127.0.0.1",
        "http://127.0.0.1:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR / "frontend"
INDEX_FILE = FRONTEND_DIR / "index.html"

app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")


@app.get("/")
async def serve_frontend():
    return FileResponse(INDEX_FILE)

# 1. Kaydettiğimiz paketi yükleyelim
with open('stroke_model_bundle.pkl', 'rb') as f:
    artifacts = pickle.load(f)

final_pipeline = artifacts['pipeline']
label_encoders = artifacts['label_encoders']
target_encoders = artifacts['target_encoders']


# 2. Giriş verisi modeli (Notebook'taki sütun sırasına dikkat ederek)
class PatientData(BaseModel):
    gender: str
    age: float
    hypertension: int
    heart_disease: int
    ever_married: str
    work_type: str
    Residence_type: str
    avg_glucose_level: float
    bmi: float
    smoking_status: str


@app.post("/predict")
async def predict(data: PatientData):
    # Veriyi DataFrame'e çevir
    df = pd.DataFrame([data.dict()])

    # 3. Notebook'undaki Ön İşleme Adımları
    # a. Smoking Status 'Unknown' ise NaN yap (Hücre 28'deki işlemin)
    df['smoking_status'] = df['smoking_status'].replace('Unknown', np.nan)

    # b. Label Encoding (gender, ever_married, Residence_type)
    for col, le in label_encoders.items():
        df[col] = le.transform(df[col])

    # c. Target Encoding (work_type, smoking_status)
    for col, te in target_encoders.items():
        df[col] = te.transform(df[col])

    # 4. Tahmin (Pipeline içindeki preprocessor/scaler burada devreye girer)
    prediction = final_pipeline.predict(df)
    probability = final_pipeline.predict_proba(df)[:, 1]

    return {
        "stroke_risk": "High" if prediction[0] == 1 else "Low",
        "probability": f"{probability[0]:.2f}"
    }


