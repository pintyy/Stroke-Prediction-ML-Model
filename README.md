# 🧠 Stroke Risk Prediction ML Model

Yapay zeka destekli inme (stroke) riski tahmin sistemi. Hasta verilerini girerek anlık risk analizi yapın.

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?logo=fastapi)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.8.0-orange?logo=scikit-learn)

## 📸 Demo

![Demo Screenshot](screenshot.png)

## 🚀 Özellikler

- ⚡ **Gerçek zamanlı tahmin** — Hasta verilerini girin, anında sonuç alın
- 🎯 **ML Pipeline** — Logistic Regression tabanlı eğitilmiş model
- 🖥️ **Modern UI** — Turuncu-siyah temalı, responsive arayüz
- 📊 **Görsel sonuçlar** — Circular score ring ve gauge bar ile risk gösterimi
- 🔒 **REST API** — FastAPI ile güvenli ve hızlı backend

## 📦 Kurulum

```bash
# Repoyu klonla
git clone https://github.com/pintyy/Stroke-Prediction-ML-Model.git
cd Stroke-Prediction-ML-Model

# Bağımlılıkları yükle
pip install -r requirements.txt

# Uygulamayı başlat
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

Tarayıcıda aç: **http://127.0.0.1:8000**

## 🧪 API Kullanımı

### Endpoint
```
POST /predict
```

### Request Body
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

## 📊 Model Parametreleri

| Parametre | Açıklama | Değer Aralığı |
|-----------|----------|---------------|
| `gender` | Cinsiyet | Male / Female / Other |
| `age` | Yaş | 0 - 120 |
| `hypertension` | Hipertansiyon | 0 (Hayır) / 1 (Evet) |
| `heart_disease` | Kalp hastalığı | 0 (Hayır) / 1 (Evet) |
| `ever_married` | Evlilik durumu | Yes / No |
| `work_type` | Çalışma türü | Private / Self-employed / Govt_job / children / Never_worked |
| `Residence_type` | Yerleşim | Urban / Rural |
| `avg_glucose_level` | Ortalama glikoz | 40 - 300 mg/dL |
| `bmi` | Vücut kitle indeksi | 10 - 60 kg/m² |
| `smoking_status` | Sigara durumu | never smoked / formerly smoked / smokes / Unknown |

## 🛠️ Teknolojiler

- **Backend:** FastAPI, Uvicorn
- **ML:** scikit-learn, pandas, numpy, category_encoders
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Model:** Logistic Regression Pipeline

## 📁 Proje Yapısı

```
├── main.py                 # FastAPI backend
├── stroke_model_bundle.pkl # Eğitilmiş ML model
├── requirements.txt        # Python bağımlılıkları
└── frontend/
    ├── index.html          # Ana sayfa
    ├── styles.css          # Stiller
    └── app.js              # Frontend mantığı
```

## ⚠️ Uyarı

Bu uygulama **eğitim amaçlıdır**. Tıbbi karar vermek için kullanılmamalıdır. Sağlık konularında mutlaka bir doktora danışın.

## 📄 Lisans

MIT License

---

**Made with ❤️ by [pintyy](https://github.com/pintyy)**
