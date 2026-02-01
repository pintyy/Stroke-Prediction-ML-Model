const form = document.getElementById("predict-form");
const submitBtn = document.getElementById("submit-btn");

// Score ring elements
const scoreRingFill = document.getElementById("score-ring-fill");
const scoreNum = document.getElementById("score-num");
const scoreStatus = document.getElementById("score-status");

// Result elements
const resultChip = document.getElementById("result-chip");
const gaugeFill = document.getElementById("gauge-fill");
const resultRisk = document.getElementById("result-risk");
const resultProb = document.getElementById("result-prob");

const API_URL = "/predict";

const setLoading = (state) => {
  submitBtn.disabled = state;
};

const setResult = (risk, probability) => {
  const prob = parseFloat(probability) || 0;
  const percent = Math.round(prob * 100);

  // Update score ring
  scoreNum.textContent = probability ? percent : "--";

  // SVG circle: circumference = 2 * PI * r = 2 * 3.14159 * 42 ≈ 264
  const circumference = 264;
  const offset = circumference - (prob * circumference);
  scoreRingFill.style.strokeDashoffset = probability ? offset : circumference;

  // Update score status
  scoreStatus.className = "score-status";
  if (risk === "High") {
    scoreStatus.textContent = "Yüksek Risk";
    scoreStatus.classList.add("high");
    scoreRingFill.style.stroke = "#ef4444";
  } else if (risk === "Low") {
    scoreStatus.textContent = "Düşük Risk";
    scoreStatus.classList.add("low");
    scoreRingFill.style.stroke = "#22c55e";
  } else if (risk === "Hata") {
    scoreStatus.textContent = "Hata";
    scoreRingFill.style.stroke = "#f59e0b";
  } else {
    scoreStatus.textContent = "Bekleniyor";
    scoreRingFill.style.stroke = "#ff8c32";
  }

  // Update result chip
  resultChip.className = "chip";
  if (risk === "High") {
    resultChip.textContent = "Yüksek Risk";
    resultChip.classList.add("chip-high");
  } else if (risk === "Low") {
    resultChip.textContent = "Düşük Risk";
    resultChip.classList.add("chip-low");
  } else if (risk === "Hata") {
    resultChip.textContent = "Hata";
    resultChip.classList.add("chip-muted");
  } else {
    resultChip.textContent = "Bekliyor";
    resultChip.classList.add("chip-muted");
  }

  // Update gauge
  gaugeFill.style.width = probability ? `${percent}%` : "0%";

  // Update result info
  resultRisk.textContent = risk || "--";
  resultProb.textContent = probability ? `${probability} (${percent}%)` : "--";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  payload.age = Number(payload.age);
  payload.hypertension = Number(payload.hypertension);
  payload.heart_disease = Number(payload.heart_disease);
  payload.avg_glucose_level = Number(payload.avg_glucose_level);
  payload.bmi = Number(payload.bmi);

  setLoading(true);
  setResult();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "API hatası");
    }

    const data = await response.json();
    setResult(data.stroke_risk, data.probability);
  } catch (error) {
    setResult("Hata", null);
    console.error(error);
  } finally {
    setLoading(false);
  }
});
