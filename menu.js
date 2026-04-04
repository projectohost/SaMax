// 🔊 звуки
const sounds = {
  click: new Audio("sounds/click.mp3"),
  tick: new Audio("sounds/tick.mp3")
};
sounds.click.volume = 0.4;

// 🛒 стан
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentItem = null;
let qty = 1;

// =======================
// 🔍 ФІЛЬТР
// =======================
function filterMenu(event, category) {
  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");

  sounds.tick.currentTime = 0;
  sounds.tick.play();

  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      category === "all" || card.classList.contains(category)
        ? "block"
        : "none";
  });
}

// =======================
// 🔍 ПОШУК
// =======================
const search = document.getElementById("search");

if (search) {
  search.addEventListener("input", () => {
    const value = search.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  });
}

// =======================
// 🍔 БУРГЕР МЕНЮ
// =======================
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

// =======================
// 🛒 КОШИК
// =======================
function toggleCart() {
  document.getElementById("cart").classList.toggle("open");
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  const list = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("count");

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    list.innerHTML += `
      <li>
        ${item.name} - ${item.price} грн
        <button onclick="removeItem(${index})">❌</button>
      </li>
    `;
    total += item.price;
  });

  totalEl.innerText = total;
  countEl.innerText = cart.length;

  saveCart();
}

function addToCart(item) {
  cart.push(item);
  sounds.click.currentTime = 0;
  sounds.click.play();

  showToast("Додано в кошик ☕");
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

// =======================
// 🧾 КЛІК ПО КНОПЦІ
// =======================
document.addEventListener("click", e => {
  if (e.target.classList.contains("order")) {
    const card = e.target.closest(".card");

    const item = {
      name: card.querySelector("h3").innerText,
      price: parseInt(card.querySelector(".price").innerText)
    };

    addToCart(item);
  }
});

// =======================
// 🔔 TOAST
// =======================
function showToast(text) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = text;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 50);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// =======================
// 🪟 МОДАЛКА
// =======================
function openModal(card) {
  const modal = document.getElementById("modal");

  qty = 1;
  document.getElementById("qty").innerText = qty;

  currentItem = {
    name: card.dataset.name,
    price: parseInt(card.dataset.price),
    img: card.dataset.img,
    desc: card.dataset.desc
  };

  document.getElementById("modalImg").src = currentItem.img;
  document.getElementById("modalTitle").innerText = currentItem.name;
  document.getElementById("modalDesc").innerText = currentItem.desc;
  document.getElementById("modalPrice").innerText = currentItem.price + " грн";

  modal.classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}

function changeQty(value) {
  qty += value;
  if (qty < 1) qty = 1;

  document.getElementById("qty").innerText = qty;
}

function addFromModal() {
  for (let i = 0; i < qty; i++) {
    addToCart(currentItem);
  }
  closeModal();
}

// =======================
// 🚀 INIT
// =======================

updateCart();

// =======================
// 🔽 СОРТУВАННЯ
// =======================
const sort = document.getElementById("sort");

if (sort) {
  sort.addEventListener("change", () => {
    const cards = Array.from(document.querySelectorAll(".card"));

    cards.sort((a, b) => {
      const priceA = parseInt(a.dataset.price);
      const priceB = parseInt(b.dataset.price);

      if (sort.value === "cheap") return priceA - priceB;
      if (sort.value === "expensive") return priceB - priceA;
      return 0;
    });

    const grid = document.getElementById("menuGrid");
    grid.innerHTML = "";

    cards.forEach(card => grid.appendChild(card));
  });
}

// =======================
// 🛒 АНІМАЦІЯ В КОШИК
// =======================
const cartBtn = document.querySelector(".cart-toggle");

document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {

    const card = btn.closest(".card");
    const img = card.querySelector("img");

    const flyImg = img.cloneNode(true);

    const rect = img.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();

    flyImg.style.position = "fixed";
    flyImg.style.left = rect.left + "px";
    flyImg.style.top = rect.top + "px";
    flyImg.style.width = rect.width + "px";
    flyImg.style.height = rect.height + "px";
    flyImg.style.transition = "all 0.8s cubic-bezier(.65,-0.3,.3,1.5)";
    flyImg.style.zIndex = "1000";
    flyImg.style.borderRadius = "10px";

    document.body.appendChild(flyImg);

    setTimeout(() => {
      flyImg.style.left = cartRect.left + "px";
      flyImg.style.top = cartRect.top + "px";
      flyImg.style.width = "30px";
      flyImg.style.height = "30px";
      flyImg.style.opacity = "0.5";
    }, 10);

    setTimeout(() => {
      flyImg.remove();

      // 🔥 маленький bounce кошика
      cartBtn.style.transform = "scale(1.3)";
      setTimeout(() => {
        cartBtn.style.transform = "";
      }, 200);

    }, 800);

  });
});
