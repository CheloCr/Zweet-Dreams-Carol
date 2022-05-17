//todo CLASE PARA ANIMAR EL BG CON POSITION EN EJE X / Y TOMANDO CONST "WORLD"
class Sprite {
    constructor({position, image, frames = {max: 1}, sprites = []}){
        this.position = position
        this.image = image
        this.frames = {...frames, val:0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
        this.moving = false
        this.sprites = sprites


        

    }
    draw(){
        ctx.drawImage(
            this.image,
            this.frames.val * this.width, // --> Representa de donde empezarmos a cortar nuestro SPRITE en el eje X
            0, // --> Representa de donde empezarmos a cortar nuestro SPRITE en el eje Y
            this.image.width / this.frames.max, // --> Que an lejos será el corte en este caso nuestro sprite es de 4
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, 
            this.image.height
        )
            //todo condicional para el movmiento del Sprite del personaje
        if(!this.moving) return

        if(this.frames.max > 1){
            this.frames.elapsed++
        }

        if(this.frames.elapsed % 10 === 0){
        
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }

    }



    
}





class Boundary {
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        ctx.fillStyle = 'rgba(255, 0, 0, 0.6)' // Se pintan cuadros de colisiones y se dejan transparentes para que no se noten 
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}