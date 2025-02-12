document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const startFormBtn = document.getElementById("startFormBtn");
  const form = document.getElementById("multiStepForm");
  const formSteps = Array.from(document.querySelectorAll(".form-step"));
  const btnNextList = Array.from(document.querySelectorAll(".btn-next"));
  const btnPrevList = Array.from(document.querySelectorAll(".btn-prev"));
  let currentStep = 0;

  // Mostrar formulario al hacer clic en "Iniciar Solicitud"
  if (startFormBtn) {
    startFormBtn.addEventListener("click", () => {
      formContainer.style.display = "block";
      formContainer.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Función para mostrar el paso actual
  function showFormStep(index) {
    formSteps.forEach((step, idx) => {
      step.classList.remove("active");
      if (idx === index) step.classList.add("active");
    });
  }

  // Inicializar primer paso
  showFormStep(currentStep);

  // Botones "Siguiente"
  btnNextList.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep < formSteps.length - 1) {
        currentStep++;
        showFormStep(currentStep);
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