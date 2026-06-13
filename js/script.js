document.addEventListener("DOMContentLoaded", () => {
  // --- Theme Cycle Switcher ---
  const themeBtn = document.getElementById("themeToggle");

  const themes = [
    {
      name: "dark",
      icon: "🌑",
    },
    {
      name: "medium",
      icon: "🌗",
    },
    {
      name: "light",
      icon: "☀️",
    },
  ];

  let currentTheme = localStorage.getItem("theme") || "dark";

  function applyTheme(theme) {
    document.body.classList.remove("medium-theme", "light-theme");

    if (theme !== "dark") {
      document.body.classList.add(`${theme}-theme`);
    }

    const themeData = themes.find((t) => t.name === theme);

    themeBtn.textContent = themeData.icon;

    localStorage.setItem("theme", theme);
  }

  applyTheme(currentTheme);

  themeBtn.addEventListener("click", () => {
    let index = themes.findIndex((t) => t.name === currentTheme);

    index = (index + 1) % themes.length;

    currentTheme = themes[index].name;

    applyTheme(currentTheme);
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
  // --- Animated Counters ---
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;

          const target = parseInt(counter.dataset.target);
          const hasPlus = counter.dataset.plus === "true";

          let current = 0;

          const updateCounter = () => {
            const increment = target / 80;

            current += increment;

            if (current < target) {
              counter.textContent = Math.ceil(current) + (hasPlus ? "+" : "");

              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + (hasPlus ? "+" : "");
            }
          };

          updateCounter();

          counterObserver.unobserve(counter);
        }
      });
    },
    {
      threshold: 0.6,
    },
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

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
