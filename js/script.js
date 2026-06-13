document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const navbar = document.getElementById("mainNav");
  const backToTop = document.getElementById("backToTop");
  const typingText = document.getElementById("typingText");
  const year = document.getElementById("year");
  const roles = ["Java Developer", "PHP Developer", "Flutter Developer", "Linux Administrator"];

  AOS.init({
    duration: 800,
    once: true,
    offset: 90
  });

  year.textContent = new Date().getFullYear();

  window.addEventListener("load", () => {
    loader.classList.add("hidden");
  });

  const updateHeader = () => {
    const isScrolled = window.scrollY > 40;
    navbar.classList.toggle("scrolled", isScrolled);
    backToTop.classList.toggle("show", window.scrollY > 450);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll(".navbar a[href^='#'], .footer-links a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navbarMenu");
      const collapse = bootstrap.Collapse.getInstance(menu);
      if (collapse) {
        collapse.hide();
      }
    });
  });

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeRole = () => {
    const currentRole = roles[roleIndex];
    const visibleText = currentRole.slice(0, charIndex);
    typingText.textContent = visibleText;

    if (!isDeleting && charIndex < currentRole.length) {
      charIndex += 1;
      setTimeout(typeRole, 90);
      return;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1300);
      return;
    }

    if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(typeRole, 45);
      return;
    }

    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 250);
  };

  typeRole();

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.querySelectorAll(".progress-bar").forEach((bar) => {
        bar.style.width = `${bar.dataset.width}%`;
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  document.querySelectorAll(".skill-card").forEach((card) => skillObserver.observe(card));

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 70));

      const updateCounter = () => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          return;
        }
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      };

      updateCounter();
      observer.unobserve(counter);
    });
  }, { threshold: 0.8 });

  document.querySelectorAll(".counter").forEach((counter) => counterObserver.observe(counter));

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Thank you. Your message is ready to be connected to a backend service.";
    contactForm.reset();
  });
});
