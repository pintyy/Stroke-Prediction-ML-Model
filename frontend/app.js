const form = document.getElementById("predict-form");
const submitBtn = document.getElementById("submit-btn");

const scoreRingFill = document.getElementById("score-ring-fill");
const scoreNum = document.getElementById("score-num");
const scoreStatus = document.getElementById("score-status");

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

  scoreNum.textContent = probability ? percent : "--";

  const circumference = 264;
  const offset = circumference - (prob * circumference);
  scoreRingFill.style.strokeDashoffset = probability ? offset : circumference;

  scoreStatus.className = "score-status";
  if (risk === "High") {
    scoreStatus.textContent = "High Risk";
    scoreStatus.classList.add("high");
    scoreRingFill.style.stroke = "#ef4444";
  } else if (risk === "Low") {
    scoreStatus.textContent = "Low Risk";
    scoreStatus.classList.add("low");
    scoreRingFill.style.stroke = "#22c55e";
  } else if (risk === "Error") {
    scoreStatus.textContent = "Error";
    scoreRingFill.style.stroke = "#f59e0b";
  } else {
    scoreStatus.textContent = "Waiting";
    scoreRingFill.style.stroke = "#ff8c32";
  }

  resultChip.className = "chip";
  if (risk === "High") {
    resultChip.textContent = "High Risk";
    resultChip.classList.add("chip-high");
  } else if (risk === "Low") {
    resultChip.textContent = "Low Risk";
    resultChip.classList.add("chip-low");
  } else if (risk === "Error") {
    resultChip.textContent = "Error";
    resultChip.classList.add("chip-muted");
  } else {
    resultChip.textContent = "Waiting";
    resultChip.classList.add("chip-muted");
  }

  gaugeFill.style.width = probability ? `${percent}%` : "0%";

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
      throw new Error(errorText || "API error");
    }

    const data = await response.json();
    setResult(data.stroke_risk, data.probability);
  } catch (error) {
    setResult("Error", null);
    console.error(error);
  } finally {
    setLoading(false);
  }
});
