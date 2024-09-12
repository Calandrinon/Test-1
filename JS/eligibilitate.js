import { updateStatistics } from "./statistics.js";

document.addEventListener("DOMContentLoaded", function () {
  let eligibility = {
    age: null,
    domicile: null,
    environment: null,
    isAssociate: null,
    targetGroup: [],
  };

  let previousEligibility = {
    isPilon1Eligible: false,
    isPilon2Eligible: false,
  };

  function updateEligibility() {
    const pilon1Text = document.getElementById("pilon1-text");
    const pilon2Text = document.getElementById("pilon2-text");
    const statusElement = document.getElementById("eligibility-status");
    const pilonElement = document.getElementById("eligibility-pilon");

    pilon1Text.style.display = "none";
    pilon2Text.style.display = "none";

    let isEligiblePilon1 = false;
    let isEligiblePilon2 = false;

    if (eligibility.age >= 18 && eligibility.age < 30) {
      pilon1Text.style.display = "block";
      isEligiblePilon1 = true;
    }

    if (eligibility.age >= 30) {
      if (eligibility.domicile === "15") {
        if (eligibility.age < 35) {
          pilon2Text.style.display = "block";
          isEligiblePilon2 = true;
        } else if (eligibility.age >= 35) {
          const targetGroups = [
            "b) Persoană în căutarea unui loc de muncă",
            "c) Șomer",
            "d) Șomer de lungă durată",
            "e) Persoană inactivă",
            "f) 1. Persoană cu nivel scăzut de instruire",
            "f) 2. Persoană cu dizabilități",
            "f) 3. Persoană din comunitățile supuse riscului de excluziune socială",
            "f) 4. Persoană din zonele rurale",
            "f) 5. Persoană eliberată din detenție",
            "f) 6. Tânăr postinstituționalizat",
            "g) Persoană reîntoarsă în țară",
          ];

          if (
            eligibility.targetGroup.some((item) =>
              targetGroups.includes(item)
            ) &&
            eligibility.domicile === "15"
          ) {
            pilon2Text.style.display = "block";
            isEligiblePilon2 = true;
          }
        }
      }
    }

    if (isEligiblePilon1 || isEligiblePilon2) {
      statusElement.textContent = "ELIGIBIL";
      pilonElement.textContent = isEligiblePilon1 ? "Pilonul 1" : "Pilonul 2";
    } else {
      statusElement.textContent = "NEELIGIBIL";
      pilonElement.textContent = "N/A";
    }

    if (
      isEligiblePilon1 !== previousEligibility.isPilon1Eligible ||
      isEligiblePilon2 !== previousEligibility.isPilon2Eligible
    ) {
      updateStatistics(isEligiblePilon1, isEligiblePilon2);
      previousEligibility.isPilon1Eligible = isEligiblePilon1;
      previousEligibility.isPilon2Eligible = isEligiblePilon2;
    }
  }

  function updateCheckboxForRural() {
    const ruralButton = document.getElementById("grupTintaF4");
    const isRural = eligibility.environment === "32";

    if (isRural) {
      if (!eligibility.targetGroup.includes(ruralButton.textContent.trim())) {
        eligibility.targetGroup.push(ruralButton.textContent.trim());
        ruralButton.classList.add("selected");
      }
    } else {
      const index = eligibility.targetGroup.indexOf(
        ruralButton.textContent.trim()
      );
      if (index !== -1) {
        eligibility.targetGroup.splice(index, 1);
        ruralButton.classList.remove("selected");
      }
    }

    updateEligibility();
  }

  document.querySelectorAll(".radio-button").forEach((button) => {
    button.addEventListener("click", function () {
      const name = this.getAttribute("name");
      const value = this.getAttribute("data-value");

      switch (name) {
        case "domiciliu":
          eligibility.domicile = value;
          break;
        case "mediu":
          eligibility.environment = value;
          updateCheckboxForRural();
          break;
        case "asociat":
          eligibility.isAssociate = value;
          break;
      }

      updateEligibility();
    });
  });

  document.querySelectorAll(".checkbox-button").forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.textContent.trim();
      const index = eligibility.targetGroup.indexOf(value);

      if (index === -1) {
        eligibility.targetGroup.push(value);
        this.classList.add("selected");
      } else {
        eligibility.targetGroup.splice(index, 1);
        this.classList.remove("selected");
      }

      updateEligibility();
    });
  });

  const ageInput = document.getElementById("varsta");
  ageInput.addEventListener("input", function () {
    eligibility.age = parseInt(ageInput.value) || null;
    updateEligibility();
  });

  // Incrementăm contorul vizitelor
  let visitCount = parseInt(localStorage.getItem("visitCount")) || 0;
  visitCount++;
  localStorage.setItem("visitCount", visitCount);
});
