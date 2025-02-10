document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const startFormBtn = document.getElementById("startFormBtn");
  
  // Mostrar el formulario al hacer clic en "Iniciar Solicitud"
  if (startFormBtn) {
    startFormBtn.addEventListener("click", () => {
      formContainer.style.display = "block";
      // Scroll suave hasta el formulario
      formContainer.scrollIntoView({ behavior: "smooth" });
    });
  }

  const form = document.getElementById("multiStepForm");
  const formSteps = Array.from(document.querySelectorAll(".form-step"));
  const btnNextList = Array.from(document.querySelectorAll(".btn-next"));
  const btnPrevList = Array.from(document.querySelectorAll(".btn-prev"));

  let currentStep = 0;

  // Función para mostrar el paso actual
  function showFormStep(index) {
    formSteps.forEach((step, idx) => {
      step.classList.remove("active");
      if (idx === index) {
        step.classList.add("active");
      }
    });
  }

  // Inicializar el primer paso
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

  // Al enviar el formulario (último paso)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Aquí podrías implementar la lógica de envío a un servidor o una alerta de confirmación
    alert("¡Gracias por completar tu solicitud! Nos pondremos en contacto pronto.");
    form.reset();
    // Reiniciar el formulario al primer paso
    currentStep = 0;
    showFormStep(currentStep);
    formContainer.scrollIntoView({ behavior: "smooth" });
  });
});