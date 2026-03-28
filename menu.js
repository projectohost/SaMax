const menu = [
{
name:"Лате",
price:60,
category:"drink",
img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"
},
{
name:"Американо",
price:45,
category:"drink",
img:"https://images.unsplash.com/photo-1511920170033-f8396924c348"
},
{
name:"Макаронс",
price:95,
category:"dessert",
img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLWYNYMgauii1wVIPr4GukI6LrlYLDZZSxgg&s"
},
{
name:"Брауні",
price:80,
category:"dessert",
img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
},
{
name:"Бургер",
price:140,
category:"food",
img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
},
{
name:"Піцца",
price:160,
category:"food",
img:"https://images.unsplash.com/photo-1548365328-8b849f6d6a2c"
}
];

const grid = document.getElementById("menuGrid");

if(grid){
menu.forEach(item=>{
grid.innerHTML += `
<div class="card ${item.category}">
<img src="${item.img}" loading="lazy">
<h3>${item.name}</h3>
<p class="price">${item.price} грн</p>
<button class="order">Замовити</button>
</div>
`;
});
}

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