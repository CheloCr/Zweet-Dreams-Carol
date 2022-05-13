
const imageB = this.img = new Image()
this.img.src = "/images/gameMap.png"




class Background {
    constructor(x,y){
        this.x = x
        this.y = y
        this.position = {
            x :-412,
            y :-80
        }

        this.img = new Image()
        this.img.src = "/images/gameMap.png"
    }

    // METHODS

    draw(){    
        
    }

}


//! PORQUE SE IENE QUE DUPLICAR EL BACKROUND EN ESTA CLASE 
//todo CHECAR PORQUE LAS ESQUINAS DEL ESCENARIO SE BARREN.

class Sprite {
    constructor ({position,velocity,image}){
        this.position = position
        this.image = image
    }

    draw() {
        ctx.drawImage(this.image,this.position.x,this.position.y)
    }

}

const background = new Sprite({ 
    position: {
        x: -412,
        y: -80
    },
    image: imageB

})



class Player {
    constructor(){




        this.img = new Image()
        this.img.src = "/images/playerDown.png"
    }

    draw(){    
        ctx.drawImage( //--> metodo para dibujar la img
        this.img,//---> vamos por el SRC de la imagen 
        0, //--> Lugar de donde vamos a empezar a recortar en X
        0,//--> Lugar de donde vamos a empezar a recortar en Y
        this.img.width / 4, //--> Dividimos el ancho de mi IMG / 4 para selecionar solo un personaje.
        this.img.height,//--> tomamos la misma altura de la IMG
        canvas.width / 2 - this.img.width / 4, // centramosen el Eje X
        canvas.height / 2 - this.img.height / 2, // centramosen el Eje Y
        this.img.width / 4, // posicion actual 
        this.img.height, // posicion actual 
        
        )
    }
}