// Vamos por nuestro canvas.
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576


const image = new Image()
image.src = "/images/gameMap.png"

image.onload = () => {
    ctx.drawImage(image,-600,0)
}


