// statistics.js

let totalChecks = 0;
let eligiblePilon1 = 0;
let eligiblePilon2 = 0;
let visitCount = 0; // Adăugăm contor pentru vizite

// Recuperăm datele din localStorage, dacă există
document.addEventListener("DOMContentLoaded", function () {
  const storedTotalChecks = localStorage.getItem("totalChecks");
  const storedEligiblePilon1 = localStorage.getItem("eligiblePilon1");
  const storedEligiblePilon2 = localStorage.getItem("eligiblePilon2");
  const storedVisitCount = localStorage.getItem("visitCount"); // Vizite

  if (storedTotalChecks) totalChecks = parseInt(storedTotalChecks, 10);
  if (storedEligiblePilon1) eligiblePilon1 = parseInt(storedEligiblePilon1, 10);
  if (storedEligiblePilon2) eligiblePilon2 = parseInt(storedEligiblePilon2, 10);
  if (storedVisitCount) visitCount = parseInt(storedVisitCount, 10); // Vizite

  updateStatisticsDisplay();
});

export function updateStatistics(isPilon1Eligible, isPilon2Eligible) {
  // Incrementăm totalul verificărilor
  totalChecks++;

  // Actualizăm contorul pentru pilonul 1
  if (isPilon1Eligible) {
    eligiblePilon1++;
  }

  // Actualizăm contorul pentru pilonul 2
  if (isPilon2Eligible) {
    eligiblePilon2++;
  }

  // Incrementăm contorul pentru vizite
  visitCount++;

  // Salvăm statisticile în localStorage
  localStorage.setItem("totalChecks", totalChecks);
  localStorage.setItem("eligiblePilon1", eligiblePilon1);
  localStorage.setItem("eligiblePilon2", eligiblePilon2);
  localStorage.setItem("visitCount", visitCount);

  // Actualizăm afișarea statisticilor
  updateStatisticsDisplay();
}

function updateStatisticsDisplay() {
  const totalChecksElem = document.getElementById("total-checks");
  const eligiblePilon1Elem = document.getElementById("pilon1-count");
  const eligiblePilon2Elem = document.getElementById("pilon2-count");
  const visitCountElem = document.getElementById("visit-count");

  if (totalChecksElem)
    totalChecksElem.textContent = `Total Checks: ${totalChecks}`;
  if (eligiblePilon1Elem)
    eligiblePilon1Elem.textContent = `Eligibili pentru Pilonul 1: ${eligiblePilon1}`;
  if (eligiblePilon2Elem)
    eligiblePilon2Elem.textContent = `Eligibili pentru Pilonul 2: ${eligiblePilon2}`;
  if (visitCountElem)
    visitCountElem.textContent = `Vizite pe site: ${visitCount}`;
}
