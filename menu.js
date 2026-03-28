const clickSound = new Audio("sounds/click.mp3");
clickSound.volume = 0.4;

function filterMenu(event,category){
document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
event.target.classList.add("active");

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

let cart = [];
let total = 0;

function toggleCart(){
document.getElementById("cart").classList.toggle("open");
}

function updateCart(){
let list = document.getElementById("cartItems");
let totalEl = document.getElementById("total");

list.innerHTML = "";

cart.forEach(item=>{
list.innerHTML += `<li>${item.name} - ${item.price} грн</li>`;
});

totalEl.innerText = total;
}

document.addEventListener("click", function(e){
if(e.target.classList.contains("order")){

clickSound.currentTime = 0;
clickSound.play();

let card = e.target.closest(".card");

let name = card.querySelector("h3").innerText;
let price = parseInt(card.querySelector(".price").innerText);

cart.push({name, price});
total += price;

updateCart();
}
});

function clearCart(){
cart = [];
total = 0;
updateCart();
}