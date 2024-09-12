document.addEventListener("DOMContentLoaded", function () {
  // Selectăm elementele din DOM
  const fundingInput = document.getElementById("fundingAmount"); // Finanțare dorită (input)
  const contributionDisplay = document.getElementById("contributionAmount"); // Contribuție (span)
  const consultingInput = document.getElementById("consultingAmount"); // Consultanță (input)
  const salariesInput = document.getElementById("salariesAmount"); // Salarii (input)
  const totalEligibleDisplay = document.getElementById("totalEligibleAmount"); // Valoare totală eligibilă (span)
  const vatDisplay = document.getElementById("vatAmount"); // Valoare TVA (span)
  const totalWithVatDisplay = document.getElementById("totalWithVatAmount"); // Valoare TOTALĂ (+TVA) (span)

  // Setăm TVA
  const TVA = 0.19;

  // Funcție pentru a formata numerele (cu separator de mii și fără zecimale)
  function formatNumber(value) {
    return Math.round(value).toLocaleString("ro-RO");
  }

  // Funcție pentru a calcula și actualiza toate valorile
  function updateCalculations() {
    const fundingAmount =
      parseFloat(fundingInput.value.replace(/\./g, "")) || 0; // Valoarea introducă în inputul Finanțare
    const consultingAmount =
      parseFloat(consultingInput.value.replace(/\./g, "")) || 0;
    const salariesAmount =
      parseFloat(salariesInput.value.replace(/\./g, "")) || 0;

    // Calculăm contribuția: 10% din valoarea totală eligibilă (AFN este 90%)
    const contributionAmount = fundingAmount / 9;

    // Calculăm valoarea totală eligibilă (VTE = AFN + AP + consultanță + salarii)
    const totalEligibleAmount =
      fundingAmount + contributionAmount + consultingAmount + salariesAmount;

    // Calculăm TVA (19% din valoarea totală eligibilă)
    const vatAmount = totalEligibleAmount * TVA;

    // Calculăm valoarea totală cu TVA (VT = VTE + TVA)
    const totalWithVatAmount = totalEligibleAmount + vatAmount;

    // Actualizăm valoarea contribuției în interfață
    contributionDisplay.innerText = formatNumber(contributionAmount) + " lei";

    // Actualizăm valoarea totală eligibilă
    totalEligibleDisplay.innerText = formatNumber(totalEligibleAmount) + " lei";

    // Actualizăm valoarea TVA
    vatDisplay.innerText = formatNumber(vatAmount) + " lei";

    // Actualizăm valoarea totală cu TVA
    totalWithVatDisplay.innerText = formatNumber(totalWithVatAmount) + " lei";
  }

  // Setăm evenimente de schimbare pentru inputurile de finanțare, consultanță și salarii
  fundingInput.addEventListener("blur", function () {
    fundingInput.value = formatNumber(fundingInput.value.replace(/\./g, ""));
    updateCalculations();
  });

  consultingInput.addEventListener("blur", function () {
    consultingInput.value = formatNumber(
      consultingInput.value.replace(/\./g, "")
    );
    updateCalculations();
  });

  salariesInput.addEventListener("blur", function () {
    salariesInput.value = formatNumber(salariesInput.value.replace(/\./g, ""));
    updateCalculations();
  });

  // Inițializăm valorile la încărcarea paginii
  updateCalculations();
  const radioButtons = document.querySelectorAll(".radio-button");
  // Butoane radio
  radioButtons.forEach((button) => {
    button.addEventListener("click", () => {
      radioButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      // Aici poți face ceva cu valoarea selectată, de exemplu:
      const selectedValue = button.dataset.value;
      console.log("Valoarea selectată:", selectedValue);
    });
  });
});
