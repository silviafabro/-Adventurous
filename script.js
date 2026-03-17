/**
 * Adventures – script.js
 * Funcionalidades: menu mobile, menu ativo, busca, formulário,
 *                  voltar ao topo, animação scroll, hover cards.
 */

/* ============================================================
   1. MENU HAMBURGUER (mobile)
   ============================================================ */
const menuToggle = document.getElementById("menuToggle");
const mainMenu   = document.getElementById("mainMenu");

if (menuToggle && mainMenu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = mainMenu.classList.toggle("open");
    menuToggle.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", function (e) {
    if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
      mainMenu.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ============================================================
   2. MENU – LINK ATIVO AO CLICAR / SCROLL
   ============================================================ */
const links = document.querySelectorAll(".menu a");

// Ativa o link ao clicar
links.forEach(function (link) {
  link.addEventListener("click", function () {
    links.forEach(function (l) { l.classList.remove("active"); });
    this.classList.add("active");

    // Fecha o menu mobile após clicar num link
    if (mainMenu) mainMenu.classList.remove("open");
    if (menuToggle) {
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Atualiza o link ativo conforme o scroll (Intersection Observer)
const sections = document.querySelectorAll("main section[id]");

const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -55% 0px",
  threshold: 0
};

const sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      links.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }
  });
}, observerOptions);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});

/* ============================================================
   3. ANIMAÇÃO DE ENTRADA DOS CARDS (Intersection Observer)
   ============================================================ */
const animatedItems = document.querySelectorAll(".card, .tip-item");

const entryObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, index) {
    if (entry.isIntersecting) {
      // Delay escalonado para cada item
      setTimeout(function () {
        entry.target.classList.add("visible");
      }, index * 80);
      entryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedItems.forEach(function (item) {
  entryObserver.observe(item);
});

/* ============================================================
   4. EFEITO HOVER NOS CARDS (via JS para consistência)
      (o CSS já cuida do transform; aqui é apenas reforço)
   ============================================================ */
const cards = document.querySelectorAll(".card");

cards.forEach(function (card) {
  // Acessibilidade: Enter/Space abre o link interno
  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      const link = card.querySelector(".card-link");
      if (link) link.click();
    }
  });
});

/* ============================================================
   5. BUSCA DE DESTINOS
   ============================================================ */
const searchInput  = document.getElementById("searchInput");
const searchBtn    = document.getElementById("searchBtn");
const searchResult = document.getElementById("searchResult");

// Base de destinos simulada
const destinations = [
  "Praia de Copacabana, Brasil",
  "Praia de Ipanema, Brasil",
  "Praia de Bonito, Brasil",
  "Montanhas de Petrópolis, Brasil",
  "Serra Gaúcha, Brasil",
  "Chapada dos Veadeiros, Brasil",
  "Machu Picchu, Peru",
  "Patagônia, Argentina",
  "Sahara, Marrocos",
  "Alpes Suíços, Suíça",
  "Santorini, Grécia",
  "Tóquio, Japão",
  "Paris, França",
  "Nova York, EUA",
  "Islândia",
  "Bali, Indonésia",
];

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    showSearchResult("⚠️ Digite um destino para buscar.", "warn");
    return;
  }

  const found = destinations.filter(function (d) {
    return d.toLowerCase().includes(query);
  });

  if (found.length > 0) {
    showSearchResult("✅ Encontramos: " + found.slice(0, 3).join(" · "), "success");
  } else {
    showSearchResult("🌍 Destino não encontrado. Tente: praia, montanha ou uma cidade!", "info");
  }
}

function showSearchResult(message, type) {
  searchResult.textContent = message;
  searchResult.style.color =
    type === "warn"    ? "#e05c5c" :
    type === "success" ? "#5cb85c" :
                         "var(--accent)";
}

if (searchBtn)   searchBtn.addEventListener("click", performSearch);
if (searchInput) {
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") performSearch();
  });
}

/* ============================================================
   6. VALIDAÇÃO E ENVIO DO FORMULÁRIO
   ============================================================ */
const contactForm  = document.getElementById("contactForm");
const nameInput    = document.getElementById("name");
const emailInput   = document.getElementById("email");
const messageInput = document.getElementById("message");
const formSuccess  = document.getElementById("formSuccess");

function showError(inputEl, errorId, message) {
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = message;
  if (inputEl) {
    inputEl.style.borderColor = "#e05c5c";
    inputEl.setAttribute("aria-invalid", "true");
  }
}

function clearError(inputEl, errorId) {
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = "";
  if (inputEl) {
    inputEl.style.borderColor = "";
    inputEl.removeAttribute("aria-invalid");
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  // Validação em tempo real
  nameInput.addEventListener("input", function () {
    if (nameInput.value.trim().length >= 2) clearError(nameInput, "nameError");
  });

  emailInput.addEventListener("input", function () {
    if (isValidEmail(emailInput.value.trim())) clearError(emailInput, "emailError");
  });

  messageInput.addEventListener("input", function () {
    if (messageInput.value.trim().length >= 10) clearError(messageInput, "messageError");
  });

  // Envio
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;
    formSuccess.textContent = "";

    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name.length < 2) {
      showError(nameInput, "nameError", "Por favor, insira seu nome completo.");
      valid = false;
    } else {
      clearError(nameInput, "nameError");
    }

    if (!isValidEmail(email)) {
      showError(emailInput, "emailError", "Insira um e-mail válido.");
      valid = false;
    } else {
      clearError(emailInput, "emailError");
    }

    if (message.length < 10) {
      showError(messageInput, "messageError", "A mensagem deve ter pelo menos 10 caracteres.");
      valid = false;
    } else {
      clearError(messageInput, "messageError");
    }

    if (valid) {
      // Simula envio (sem backend)
      const btn = contactForm.querySelector("button[type='submit']");
      btn.disabled = true;
      btn.textContent = "Enviando…";

      setTimeout(function () {
        contactForm.reset();
        btn.disabled = false;
        btn.textContent = "Enviar mensagem";
        formSuccess.textContent = "✅ Mensagem enviada com sucesso! Entraremos em contato em breve.";

        // Limpa a mensagem de sucesso após 5s
        setTimeout(function () {
          formSuccess.textContent = "";
        }, 5000);
      }, 1200);
    }
  });
}

/* ============================================================
   7. BOTÃO VOLTAR AO TOPO
   ============================================================ */
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", function () {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}