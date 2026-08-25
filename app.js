/* ============================================
   XonAtir — Atir tanlash landing sahifasi
   Yangilangan versiya — sotuvni kuchaytirish uchun
   ============================================ */

// ---- DATA ----
const baskets = {
  bloom: {
    items: ["Yuqori nota: bergamot", "Yurak nota: atirgul", "Baza nota: vanil musk"],
  },
  oud: {
    items: ["Yuqori nota: ziravorlar", "Yurak nota: oud", "Baza nota: amber charm"],
  },
  fresh: {
    items: ["Yuqori nota: limon", "Yurak nota: neroli", "Baza nota: oq mushk"],
  },
};

const quizSteps = [
  {
    kicker: "SIZNING VIBINGIZ",
    question: "Bugun o'zingizni qanday his qilmoqchisiz?",
    options: [
      ["Nozik va romantik", "bloom"],
      ["Dadil va sirli", "oud"],
      ["Yengil va erkin", "fresh"],
    ],
  },
  {
    kicker: "QACHON UCHUN?",
    question: "Bu atir qaysi holatingizga hamroh bo'ladi?",
    options: [
      ["Uchrashuv va kechalar", "oud"],
      ["Har kun, o'zim uchun", "fresh"],
      ["Nozik taassurot uchun", "bloom"],
    ],
  },
  {
    kicker: "SIZDA QOLADIGAN NOTA",
    question: "Qaysi hissiyot sizga yaqinroq?",
    options: [
      ["Gullar va mayinlik", "bloom"],
      ["Yog'och va iliqlik", "oud"],
      ["Suv va shabada", "fresh"],
    ],
  },
];

const quizResults = {
  bloom: { name: "Nozik & nafis", note: "Floral · musk · vanilla" },
  oud: { name: "Jozibali & sirli", note: "Oud · amber · charm" },
  fresh: { name: "Sof & erkin", note: "Citrus · aquatic · green" },
};

// ---- DOM ELEMENTS ----
const loader = document.querySelector("#page-loader");
const sheet = document.querySelector("#basket-sheet");
const sheetTitle = document.querySelector("#sheet-title");
const sheetPrice = document.querySelector("#sheet-price");
const sheetItems = document.querySelector("#sheet-items");
const sheetImage = document.querySelector("#sheet-image");
const cartCount = document.querySelector("#cart-count");
const toast = document.querySelector("#toast");
const quizCount = document.querySelector("#quiz-count");
const quizProgress = document.querySelector("#quiz-progress");
const quizKicker = document.querySelector(".quiz-kicker");
const quizQuestion = document.querySelector("#quiz-question");
const quizOptions = document.querySelector("#quiz-options");
const quizResult = document.querySelector("#quiz-result");
const quizResultName = document.querySelector("#quiz-result-name");
const quizResultNote = document.querySelector("#quiz-result-note");
const urgencyBanner = document.querySelector("#urgency-banner");
const urgencyClose = document.querySelector("#urgency-close");
const countdownTimer = document.querySelector("#countdown-timer");

let selectedBasket = null;
let toastTimeout;
let quizStep = 0;
let quizAnswers = [];

// ============================================
// URGENCY BANNER & COUNTDOWN
// ============================================
(function initCountdown() {
  // Set countdown to 3 hours from now (persists via session)
  let endTime = sessionStorage.getItem("xonatir_countdown");
  if (!endTime || Date.now() > Number(endTime)) {
    endTime = Date.now() + 3 * 60 * 60 * 1000;
    sessionStorage.setItem("xonatir_countdown", endTime);
  }

  function updateTimer() {
    const diff = Math.max(0, Number(endTime) - Date.now());
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    if (countdownTimer) countdownTimer.textContent = `${h}:${m}:${s}`;
    if (diff > 0) requestAnimationFrame(updateTimer);
  }
  updateTimer();

  // Close urgency banner
  if (urgencyClose) {
    urgencyClose.addEventListener("click", () => {
      urgencyBanner.classList.add("hidden");
      document.body.style.paddingTop = "";
    });
  }
})();

// ============================================
// PAGE LOADER
// ============================================
window.addEventListener("load", () => {
  window.setTimeout(() => {
    if (loader) loader.classList.add("is-done");
  }, 650);
});

// ============================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// ============================================
// BASKET (BOTTOM SHEET)
// ============================================
function openBasket(card) {
  const { basket, name, price, items, image } = card.dataset;
  selectedBasket = { basket, name, price, items, image };
  sheetTitle.textContent = name;
  sheetPrice.textContent = price;
  sheetImage.src = image;
  sheetImage.alt = `${name} atir yo'nalishi`;
  sheetItems.innerHTML = baskets[basket].items
    .map(
      (item, index) =>
        `<div class="item-pill"><span>${String(index + 1).padStart(2, "0")}</span>${item}</div>`
    )
    .join("");
  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Update WhatsApp link with selected basket
  const orderBtn = document.querySelector("#order-button");
  if (orderBtn) {
    const waText = encodeURIComponent(
      `Assalomu alaykum! "${name}" atir yo'nalishini buyurtma qilmoqchiman.`
    );
    orderBtn.href = `https://wa.me/998901234567?text=${waText}`;
  }
}

function closeBasket() {
  sheet.classList.remove("is-open");
  sheet.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showToast(message) {
  toast.querySelector("p").textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3700);
}

// Basket card clicks
document.querySelectorAll(".basket-card").forEach((card) => {
  card.addEventListener("click", () => openBasket(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") openBasket(card);
  });
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
});

// ============================================
// NOTE FILTER
// ============================================
document.querySelectorAll(".note-filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { filter } = button.dataset;
    document
      .querySelectorAll(".note-filter-button")
      .forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelectorAll(".basket-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.family !== filter;
    });
  });
});

// ============================================
// QUIZ
// ============================================
function renderQuiz() {
  const step = quizSteps[quizStep];
  quizCount.textContent = `0${quizStep + 1} / 03`;
  quizProgress.style.width = `${((quizStep + 1) / quizSteps.length) * 100}%`;
  quizKicker.textContent = step.kicker;
  quizQuestion.textContent = step.question;
  quizOptions.innerHTML = step.options
    .map(
      ([label, value]) =>
        `<button type="button" data-quiz-value="${value}">${label}<span>↗</span></button>`
    )
    .join("");
  quizOptions.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      quizAnswers.push(button.dataset.quizValue);
      quizStep += 1;
      if (quizStep < quizSteps.length) {
        renderQuiz();
      } else {
        showQuizResult();
      }
    });
  });
}

function showQuizResult() {
  const score = quizAnswers.reduce(
    (totals, answer) => ({ ...totals, [answer]: (totals[answer] || 0) + 1 }),
    {}
  );
  const resultKey = Object.keys(quizResults).sort(
    (first, second) => (score[second] || 0) - (score[first] || 0)
  )[0];
  const result = quizResults[resultKey];
  quizCount.textContent = "TAYYOR";
  quizProgress.style.width = "100%";
  quizKicker.hidden = true;
  quizQuestion.hidden = true;
  quizOptions.hidden = true;
  quizResultName.textContent = result.name;
  quizResultNote.textContent = result.note;
  quizResult.dataset.result = resultKey;
  quizResult.hidden = false;
}

document.querySelector("#quiz-open-result").addEventListener("click", () => {
  const card = document.querySelector(`[data-basket="${quizResult.dataset.result}"]`);
  openBasket(card);
});

document.querySelector("#quiz-restart").addEventListener("click", () => {
  quizStep = 0;
  quizAnswers = [];
  quizKicker.hidden = false;
  quizQuestion.hidden = false;
  quizOptions.hidden = false;
  quizResult.hidden = true;
  renderQuiz();
});

renderQuiz();

// ============================================
// SHEET CLOSE
// ============================================
document.querySelector("#sheet-close").addEventListener("click", closeBasket);
document.querySelector("#sheet-backdrop").addEventListener("click", closeBasket);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeBasket();
});

// ============================================
// ORDER BUTTON
// ============================================
document.querySelector("#order-button").addEventListener("click", () => {
  if (!selectedBasket) return;
  cartCount.textContent = "1";
  closeBasket();
  showToast(`"${selectedBasket.name}" tanlandi. WhatsApp orqali buyurtma bering.`);
});

// ============================================
// CART BUTTON
// ============================================
document.querySelector("#cart-button").addEventListener("click", () => {
  if (selectedBasket) {
    const matchingCard = document.querySelector(`[data-basket="${selectedBasket.basket}"]`);
    openBasket(matchingCard);
  } else {
    document.querySelector("#savats").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Avval kayfiyatingizga mos atir yo'nalishini tanlang.");
  }
});

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll(".faq-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const item = toggle.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    // Close all other items
    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add("open");
    }
  });
});

// ============================================
// COUNTER ANIMATION (Reviews Stats)
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    if (counter.dataset.animated) return;

    const target = parseFloat(counter.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isDecimal) {
        counter.textContent = current.toFixed(1);
      } else {
        counter.textContent = Math.floor(current).toLocaleString("uz-UZ");
      }

      // Add suffix for percentage
      if (counter.closest(".stat-item")?.querySelector(".stat-label")?.textContent.includes("%")) {
        counter.textContent += "%";
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.dataset.animated = "true";
        // Final value
        if (isDecimal) {
          counter.textContent = target.toFixed(1);
        } else {
          counter.textContent = target.toLocaleString("uz-UZ");
        }
      }
    }

    requestAnimationFrame(update);
  });
}

// Observe stats section
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".reviews-stats");
if (statsSection) statsObserver.observe(statsSection);

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============================================
// PARALLAX EFFECT ON HERO DISC
// ============================================
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const disc = document.querySelector(".hero-disc");
      if (disc && scrollY < window.innerHeight) {
        disc.style.transform = `rotate(${-10 + scrollY * 0.02}deg) translateY(${scrollY * 0.08}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
});

// ============================================
// ADD TO CART ANIMATION
// ============================================
function addToCartAnimation(button) {
  button.style.transform = "scale(0.95)";
  setTimeout(() => {
    button.style.transform = "";
  }, 150);
}

// ============================================
// CARD TILT EFFECT (Mouse)
// ============================================
document.querySelectorAll(".basket-card, .price-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ============================================
// PRELOAD CRITICAL IMAGES
// ============================================
window.addEventListener("load", () => {
  const images = document.querySelectorAll("img[loading='lazy']");
  if ("IntersectionObserver" in window) {
    // Images with loading="lazy" are handled by the browser
  }
});

console.log("🌸 XonAtir — Sizning hidingiz. Yangilangan versiya yuklandi.");
