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
    question: "Bugun o‘zingizni qanday his qilmoqchisiz?",
    options: [
      ["Nozik va romantik", "bloom"],
      ["Dadil va sirli", "oud"],
      ["Yengil va erkin", "fresh"],
    ],
  },
  {
    kicker: "QACHON UCHUN?",
    question: "Bu atir qaysi holatingizga hamroh bo‘ladi?",
    options: [
      ["Uchrashuv va kechalar", "oud"],
      ["Har kun, o‘zim uchun", "fresh"],
      ["Nozik taassurot uchun", "bloom"],
    ],
  },
  {
    kicker: "SIZDA QOLADIGAN NOTA",
    question: "Qaysi hissiyot sizga yaqinroq?",
    options: [
      ["Gullar va mayinlik", "bloom"],
      ["Yog‘och va iliqlik", "oud"],
      ["Suv va shabada", "fresh"],
    ],
  },
];

const quizResults = {
  bloom: { name: "Nozik & nafis", note: "Floral · musk · vanilla" },
  oud: { name: "Jozibali & sirli", note: "Oud · amber · charm" },
  fresh: { name: "Sof & erkin", note: "Citrus · aquatic · green" },
};

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
let selectedBasket = null;
let toastTimeout;
let quizStep = 0;
let quizAnswers = [];

window.addEventListener("load", () => {
  window.setTimeout(() => loader.classList.add("is-done"), 650);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

function openBasket(card) {
  const { basket, name, price, items, image } = card.dataset;
  selectedBasket = { basket, name, price, items, image };
  sheetTitle.textContent = name;
  sheetPrice.textContent = price;
  sheetImage.src = image;
  sheetImage.alt = `${name} atir yo‘nalishi`;
  sheetItems.innerHTML = baskets[basket].items
    .map((item, index) => `<div class="item-pill"><span>${String(index + 1).padStart(2, "0")}</span>${item}</div>`)
    .join("");
  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
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

document.querySelectorAll(".basket-card").forEach((card) => {
  card.addEventListener("click", () => openBasket(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") openBasket(card);
  });
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
});

document.querySelectorAll(".note-filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { filter } = button.dataset;
    document.querySelectorAll(".note-filter-button").forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelectorAll(".basket-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.family !== filter;
    });
  });
});

function renderQuiz() {
  const step = quizSteps[quizStep];
  quizCount.textContent = `0${quizStep + 1} / 03`;
  quizProgress.style.width = `${((quizStep + 1) / quizSteps.length) * 100}%`;
  quizKicker.textContent = step.kicker;
  quizQuestion.textContent = step.question;
  quizOptions.innerHTML = step.options
    .map(([label, value]) => `<button type="button" data-quiz-value="${value}">${label}<span>↗</span></button>`)
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
  const score = quizAnswers.reduce((totals, answer) => ({ ...totals, [answer]: (totals[answer] || 0) + 1 }), {});
  const resultKey = Object.keys(quizResults).sort((first, second) => (score[second] || 0) - (score[first] || 0))[0];
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

document.querySelector("#sheet-close").addEventListener("click", closeBasket);
document.querySelector("#sheet-backdrop").addEventListener("click", closeBasket);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeBasket();
});

document.querySelector("#order-button").addEventListener("click", () => {
  if (!selectedBasket) return;
  cartCount.textContent = "1";
  closeBasket();
  showToast(`“${selectedBasket.name}” tanlandi. Atirlar katalogi keyingi bosqichda ulanadi.`);
});

document.querySelector("#cart-button").addEventListener("click", () => {
  if (selectedBasket) {
    const matchingCard = document.querySelector(`[data-basket="${selectedBasket.basket}"]`);
    openBasket(matchingCard);
  } else {
    document.querySelector("#savats").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Avval kayfiyatingizga mos atir yo‘nalishini tanlang.");
  }
});
