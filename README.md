# Stroke Risk Prediction

A machine learning-based stroke risk prediction system with a FastAPI backend and modern web interface.

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?logo=fastapi)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.8.0-orange?logo=scikit-learn)

## Demo

![Demo Screenshot](screenshot.png)

## Features

- Real-time stroke risk prediction based on patient data
- Logistic Regression pipeline with preprocessing
- Modern, responsive web interface
- REST API for easy integration

## Installation

```bash
git clone https://github.com/pintyy/Stroke-Prediction-ML-Model.git
cd Stroke-Prediction-ML-Model

pip install -r requirements.txt

python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

Open in browser: **http://127.0.0.1:8000**

## API Usage

### Endpoint

```
POST /predict
```

### Request

```json
{
  "gender": "Male",
  "age": 67,
  "hypertension": 1,
  "heart_disease": 1,
  "ever_married": "Yes",
  "work_type": "Private",
  "Residence_type": "Urban",
  "avg_glucose_level": 228.69,
  "bmi": 36.6,
  "smoking_status": "formerly smoked"
}
```

### Response

```json
{
  "stroke_risk": "High",
  "probability": "0.78"
}
```

## Parameters

| Parameter | Description | Values |
|-----------|-------------|--------|
| `gender` | Gender | Male / Female / Other |
| `age` | Age | 0 - 120 |
| `hypertension` | Hypertension | 0 (No) / 1 (Yes) |
| `heart_disease` | Heart disease | 0 (No) / 1 (Yes) |
| `ever_married` | Marital status | Yes / No |
| `work_type` | Work type | Private / Self-employed / Govt_job / children / Never_worked |
| `Residence_type` | Residence | Urban / Rural |
| `avg_glucose_level` | Average glucose level | 40 - 300 mg/dL |
| `bmi` | Body mass index | 10 - 60 kg/m² |
| `smoking_status` | Smoking status | never smoked / formerly smoked / smokes / Unknown |

## Tech Stack

- **Backend:** FastAPI, Uvicorn
- **ML:** scikit-learn, pandas, numpy, category_encoders
- **Frontend:** HTML, CSS, JavaScript

## Project Structure

```
├── main.py                 # FastAPI backend
├── stroke_model_bundle.pkl # Trained ML model
├── requirements.txt        # Dependencies
└── frontend/
    ├── index.html
    ├── styles.css
    └── app.js
```

## Disclaimer

This application is for educational purposes only. It should not be used for medical decision-making. Always consult a healthcare professional.

