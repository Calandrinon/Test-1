document.addEventListener("DOMContentLoaded", function () {
  // Funcție pentru activarea și dezactivarea butoanelor radio
  function handleRadioSelection(buttonGroup, selectedButton) {
    buttonGroup.forEach((button) => {
      if (button === selectedButton) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  }

  // Funcție pentru activarea și dezactivarea butoanelor checkbox
  function toggleCheckboxSelection(button) {
    button.classList.toggle("selected");
  }

  // Selectăm toate butoanele personalizate (radio și checkbox)
  const allRadioButtons = document.querySelectorAll(".radio-button");
  const allCheckboxButtons = document.querySelectorAll(".checkbox-button");

  // Mapăm butoanele radio după atributul 'name' (pentru a le grupa)
  const radioButtonGroups = {};

  allRadioButtons.forEach((button) => {
    const groupName = button.getAttribute("name");

    // Creăm un grup de butoane pentru fiecare 'name' diferit
    if (!radioButtonGroups[groupName]) {
      radioButtonGroups[groupName] = [];
    }
    radioButtonGroups[groupName].push(button);
  });

  // Adăugăm event listener pentru fiecare buton radio în funcție de grupul său
  Object.keys(radioButtonGroups).forEach((groupName) => {
    const group = radioButtonGroups[groupName];

    group.forEach((button) => {
      button.addEventListener("click", function () {
        handleRadioSelection(group, button);
      });
    });
  });

  // Adăugăm event listener pentru fiecare buton checkbox (fără grupare, permite selecție multiplă)
  allCheckboxButtons.forEach((button) => {
    button.addEventListener("click", function () {
      toggleCheckboxSelection(button);
    });
  });
});
