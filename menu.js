/* FILTER */
function filterMenu(event,category){
document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
event.target.classList.add("active");

document.querySelectorAll(".card").forEach(card=>{
card.classList.toggle("hide",
category !== "all" && !card.classList.contains(category));
});
}

/* SEARCH */
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

/* ORDER */
document.addEventListener("click", function(e){
if(e.target.classList.contains("order")){
alert("✅ Додано до замовлення");
}
});

/* BURGER */
function toggleMenu(){
document.getElementById("navLinks").classList.toggle("show");
}

/* CLOSE MENU */
document.addEventListener("click", function(e){
let nav = document.getElementById("navLinks");
if(nav && !nav.contains(e.target) && !e.target.classList.contains("burger")){
nav.classList.remove("show");
}
});