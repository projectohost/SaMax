const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
button.addEventListener("click", () => {
alert("Страву додано до замовлення");
});
});