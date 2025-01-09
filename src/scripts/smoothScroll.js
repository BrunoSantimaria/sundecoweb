export function initSmoothScroll() {
  const sections = document.querySelectorAll(".section");
  let currentSection = 0;
  let isScrolling = false;

  // Prevenir scroll normal
  document.body.style.overflow = "hidden";

  function goToSection(index) {
    if (index >= 0 && index < sections.length && !isScrolling) {
      isScrolling = true;
      currentSection = index;

      sections.forEach((section, i) => {
        section.style.transform = `translateY(-${currentSection * 100}%)`;
        section.classList.toggle("active", i === currentSection);
      });

      setTimeout(() => {
        isScrolling = false;
      }, 1000); // Coincide con la duración de la transición
    }
  }

  // Manejador de scroll
  function handleWheel(e) {
    if (isScrolling) return;

    if (e.deltaY > 0) {
      goToSection(currentSection + 1);
    } else {
      goToSection(currentSection - 1);
    }
  }

  // Event listeners
  document.addEventListener("wheel", handleWheel, { passive: false });

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      goToSection(currentSection + 1);
    } else if (e.key === "ArrowUp") {
      goToSection(currentSection - 1);
    }
  });
}
