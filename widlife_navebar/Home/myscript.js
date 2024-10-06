const new_menu= document.querySelector(".new-menu");
const container= document.querySelector(".container")

new_menu.addEventListener("click", () => {
    container.classList.toggle("active")
})