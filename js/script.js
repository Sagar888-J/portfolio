document.addEventListener("DOMContentLoaded", () => {
  // --- Theme Switcher ---
  const themeBtn = document.querySelector(".theme-btn");
  const themeMenu = document.querySelector(".theme-menu");
  const themeOptions = document.querySelectorAll(".theme-menu button");

  // Toggle dropdown
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      themeMenu.classList.toggle("active");
    });
  }

  // Change theme
  themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedTheme = option.getAttribute("data-theme");

      document.body.classList.remove(
        "dark-theme",
        "medium-theme",
        "light-theme",
      );

      if (selectedTheme !== "dark") {
        document.body.classList.add(`${selectedTheme}-theme`);
      }

      localStorage.setItem("theme", selectedTheme);

      themeMenu.classList.remove("active");
    });
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";

  document.body.classList.remove("dark-theme", "medium-theme", "light-theme");

  if (savedTheme !== "dark") {
    document.body.classList.add(`${savedTheme}-theme`);
  }

  // Close theme menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".theme-switcher")) {
      themeMenu.classList.remove("active");
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  mobileBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      mobileBtn.querySelector("i").classList.replace("fa-times", "fa-bars");
    });
  });

  // --- Sticky Header & Active Links ---
  const header = document.querySelector(".header");
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    // Sticky Header
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Active Link Highlighting
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active");
      }
    });
  });

  // --- Typing Effect ---
  const typingText = document.querySelector(".typing-text");
  const roles = [
    "Web Developer",
    "WordPress Expert",
    "Vue.js Specialist",
    "CRM Integrator",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  if (typingText) type();

  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");

        // Trigger counters if they are in this section
        const counters = entry.target.querySelectorAll(".counter");
        if (counters.length > 0) {
          runCounters(counters);
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add fade-in class to major elements
  document
    .querySelectorAll(".glass-panel, .section-title, .timeline-item")
    .forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });

  // --- Animated Counters ---
  let countersRun = false;

  function runCounters(counters) {
    if (countersRun) return;

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      const hasPlus = counter.dataset.plus === "true";

      let current = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          counter.textContent = Math.ceil(current) + (hasPlus ? "+" : "");

          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + (hasPlus ? "+" : "");
        }
      };

      updateCounter();
    });

    countersRun = true;
  }

  // --- Project Filtering ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300); // matches transition time
        }
      });
    });
  });

  // --- Current Year for Footer ---
  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
