// Vamos por nuestro canvas.
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576


// movmiento
const keys = {
    ArrowUp:{pressed:false},
    ArrowDown:{pressed:false},
    ArrowLeft:{pressed:false},
    ArrowRight:{pressed:false},

}
