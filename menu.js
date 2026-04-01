const clickSound = new Audio("sounds/click.mp3");
const tickSound = new Audio("sounds/tick.mp3");
clickSound.volume = 0.4;

function filterMenu(event,category){
document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
event.target.classList.add("active");

tickSound.currentTime = 0;
tickSound.play();

document.querySelectorAll(".card").forEach(card=>{
card.style.display = (category === "all" || card.classList.contains(category)) ? "block" : "none";
});
}

let search = document.getElementById("search");
if(search){
search.addEventListener("input", function(){
let value = this.value.toLowerCase();

document.querySelectorAll(".card").forEach(card=>{
let text = card.innerText.toLowerCase();
card.style.display = text.includes(value) ? "block" : "none";
});
});
}

function toggleMenu(){
document.getElementById("navLinks").classList.toggle("show");
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

function toggleCart(){
document.getElementById("cart").classList.toggle("open");
}

function updateCart(){
let list = document.getElementById("cartItems");
let totalEl = document.getElementById("total");

list.innerHTML = "";
total = 0;

cart.forEach(item=>{
list.innerHTML += `<li>${item.name} - ${item.price} грн</li>`;
total += item.price;
});

totalEl.innerText = total;

/* 🔥 збереження */
localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("click", function(e){
if(e.target.classList.contains("order")){

clickSound.currentTime = 0;
clickSound.play();

let card = e.target.closest(".card");

let name = card.querySelector("h3").innerText;
let price = parseInt(card.querySelector(".price").innerText);

cart.push({name, price});
showToast("Додано в кошик ☕");
total += price;

updateCart();
}
});

function clearCart(){
cart = [];
total = 0;
updateCart();
}

function showToast(text){
let div = document.createElement("div");
div.innerText = text;
div.style.position = "fixed";
div.style.bottom = "30px";
div.style.left = "50%";
div.style.transform = "translateX(-50%)";
div.style.background = "#00d4ff";
div.style.padding = "10px 20px";
div.style.borderRadius = "20px";
div.style.zIndex = "999";

document.body.appendChild(div);

setTimeout(()=>div.remove(),2000);
}

updateCart();

function showToast(text){
let toast = document.createElement("div");
toast.className = "toast";
toast.innerText = text;

document.body.appendChild(toast);

setTimeout(()=>toast.classList.add("show"),50);

setTimeout(()=>{
toast.classList.remove("show");
setTimeout(()=>toast.remove(),300);
},2000);
}