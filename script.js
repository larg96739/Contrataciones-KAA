document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const startFormBtn = document.getElementById("startFormBtn");
  const form = document.getElementById("multiStepForm");
  const btnNextList = Array.from(document.querySelectorAll(".btn-next"));
  const btnPrevList = Array.from(document.querySelectorAll(".btn-prev"));
  let currentStep = 0;

 
// Modificar evento click del botón inicial
if (startFormBtn) {
  startFormBtn.addEventListener("click", () => {
    formContainer.style.display = "block";
    startFormBtn.style.display = "none";
    // Mostrar solo el paso de introducción
    showFormStep(0);
    formSteps.forEach(step => step.classList.remove("active"));
    document.querySelector(".form-step").classList.add("active");
  });
}

// Actualizar total de pasos
const formSteps = Array.from(document.querySelectorAll(".form-step"));

  // Función para mostrar el paso actual
  function showFormStep(index) {
    formSteps.forEach((step, idx) => {
      step.classList.remove("active");
      if (idx === index) step.classList.add("active");
    });
  }

  // Inicializar primer paso
  showFormStep(currentStep);

// Modificar en script.js
btnNextList.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      if (currentStep < formSteps.length - 1) {
        currentStep++;
        showFormStep(currentStep);
      }
    }
  });
});

  // Botones "Anterior"
  btnPrevList.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showFormStep(currentStep);
      }
    });
  });

// Añadir al script.js
function validateStep(stepIndex) {
  const currentStep = formSteps[stepIndex];
  const inputs = currentStep.querySelectorAll("input, textarea, select");
  let isValid = true;

  inputs.forEach(input => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      isValid = false;
      input.style.borderColor = "#ff4444";
    } else {
      input.style.borderColor = "#ccc";
    }
  });

  return isValid;
}

  // ========== CORRECCIÓN PRINCIPAL ========== //
  // Manejar envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        currentStep = 0;             // Reiniciar pasos
        showFormStep(currentStep);  // Mostrar primer paso
        form.reset();               // Limpiar campos
        formContainer.scrollIntoView({ behavior: "smooth" });
        alert("¡Formulario enviado con éxito!");
      }
    })
    .catch((error) => {
      alert("Error al enviar. Inténtalo de nuevo.");
    });
  });
});