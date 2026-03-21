function filterMenu(category){
let cards = document.querySelectorAll(".card");

cards.forEach(card => {
if(category === "all" || card.classList.contains(category)){
card.classList.remove("hide");
}
else{
card.classList.add("hide");
}
});
}