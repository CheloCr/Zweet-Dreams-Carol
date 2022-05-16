const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

//todo ITERAMOS NUESTRO ARREGLO DE COLISIONES
const mapBound = []
for (let i = 0 ; i < collisions.length ; i += 70){
    mapBound.push(collisions.slice(i,70 + i))

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
        ctx.fillStyle = 'rgba(255, 0, 0, 0.0)' // Se pintan cuadros de colisiones y se dejan transparentes para que no se noten 
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}


//todo LLENAMOS A WALLS DE PAREDES Y LAS PINTAMOS CREANDO UN NEW Boundary
const walls = [] // Se llena de todos los 1025 que hay en "Collision.js"
const offset = { // Esto permite que los limites tomen la misma dimension del BG
    x: -770,
    y: -60
}
//todo Creando Array 2D
mapBound.forEach((row, i) => { // Este itera nuestro SubArray de "Collision.js"
    row.forEach((symbol, j) => { // Este itera lo que se encuentra adentro del SubArray
        if ( symbol === 1025) // Como los Limites estan epresentados por "1025" con esto le dicimos que solo tome en cuenta los que tienen este numero
        walls.push(new Boundary({
                position:{
                    x: j * Boundary.width + offset.x,
                 y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

console.log(walls)


ctx.fillStyle = 'White'
ctx.fillRect(0,0,canvas.width,canvas.height)

const world = new Image()
world.src = '/images/LEVL5.png'

const playerImage = new Image()
playerImage.src = '/images/playerDown.png'


//todo CLASE PARA ANIMAR EL BG CON POSITION EN EJE X / Y TOMANDO CONST "WORLD"
class Sprite {
    constructor({position, image, frames = {max: 1}}){
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
        

    }
    draw(){
        ctx.drawImage(
            this.image,
            0, // --> Representa de donde empezarmos a cortar nuestro SPRITE en el eje X
            0, // --> Representa de donde empezarmos a cortar nuestro SPRITE en el eje Y
            this.image.width / this.frames.max, // --> Que an lejos será el corte en este caso nuestro sprite es de 4
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, 
            this.image.height
        )
    }
}


const player = new Sprite ({
    position:{
        x: canvas.width / 2 - 192 / 4 / 2, // --> lugar dond ese pinta la imágen (centro del canvas)
        y: canvas.height / 2 - 68 /2, // --> lugar dond ese pinta la imágen (centro del canvas)
    },
    image:playerImage,
    frames: {
        max:4
    }
})

const backgroundSprite = new Sprite({
    position:{
        x:offset.x,
        y:offset.y
    },
    image: world
})


//todo VALORES POR DEFAULT CUANDO LAS TECLAS NO ESTAN APRETADAS
const keys = {
    ArrowUp: {pressed:false},
    ArrowDown: {pressed:false},
    ArrowLeft: {pressed:false},
    ArrowRight: {pressed:false}
}



const movables = [backgroundSprite, ...walls] // Variables que queremos que se muevan con el escenario

//todo CHECAR COLISIONES
function rectCollision ({rectangle1,rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

//todo FUNCION PARA ANIMAR EL JUEGO (se crea un loop infinito)
function updateGame (){
    requestAnimationFrame(updateGame)
    backgroundSprite.draw()
    walls.forEach(wall => {
        wall.draw()

        

    })
    player.draw()

    
    //todo CONDICIONAL PARA MOVER EL BG DEPENDIENDO DELA TECLA QUE SE APRIETE Y SU VALOR FALSE/TRUE
    //todo ESTO AFECTA A EL BG EN SU POSICION Y/X AUMENTANDO O QUITANDO
    let moving = true
    if(keys.ArrowUp.pressed && lastKey === 'ArrowUp' ) {
        for(let i = 0; i < walls.length; i++) {
            //todo CHECAR COLISIONES
            const wall = walls [i]
            if(
                rectCollision({
                rectangle1:player,
                rectangle2:{
                    ...wall,
                    position: {
                    x:wall.position.x,
                    y:wall.position.y + 3
                }}
                })
                )  {
                console.log('TOCASTE!')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach(movable => {movable.position.y +=3})}
    else if(keys.ArrowDown.pressed && lastKey === 'ArrowDown'){
        for(let i = 0; i < walls.length; i++) {
            //todo CHECAR COLISIONES
            const wall = walls [i]
            if(
                rectCollision({
                rectangle1:player,
                rectangle2:{
                    ...wall,
                    position: {
                    x:wall.position.x,
                    y:wall.position.y -3 
                }}
                })
                )  {
                console.log('TOCASTE!')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach(movable => {movable.position.y -=3})}


    else if(keys.ArrowLeft.pressed && lastKey === 'ArrowLeft'){
        for(let i = 0; i < walls.length; i++) {
            //todo CHECAR COLISIONES
            const wall = walls [i]
            if(
                rectCollision({
                rectangle1:player,
                rectangle2:{
                    ...wall,
                    position: {
                    x:wall.position.x + 3,
                    y:wall.position.y  
                }}
                })
                )  {
                console.log('TOCASTE!')
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach(movable => {movable.position.x +=3})}


    else if(keys.ArrowRight.pressed && lastKey === 'ArrowRight'){
        for(let i = 0; i < walls.length; i++) {
            //todo CHECAR COLISIONES
            const wall = walls [i]
            if(
                rectCollision({
                rectangle1:player,
                rectangle2:{
                    ...wall,
                    position: {
                    x:wall.position.x - 3,
                    y:wall.position.y  
                }}
                })
                )  {
                console.log('TOCASTE!')
                moving = false
                break
            }
        }
        if(moving)
        
        movables.forEach(movable => {movable.position.x -=3})}


}
updateGame()


let lastKey = ''
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp' :
            keys.ArrowUp.pressed = true //todo cambiamos valores cada que la tecla se aprieta
            lastKey = 'ArrowUp'
        break
        case 'ArrowDown' :
            keys.ArrowDown.pressed = true //todo cambiamos valores cada que la tecla se aprieta
            lastKey = 'ArrowDown'
        break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true //todo cambiamos valores cada que la tecla se aprieta
            lastKey = 'ArrowLeft'
        break
        case 'ArrowRight' :
            keys.ArrowRight.pressed = true //todo cambiamos valores cada que la tecla se aprieta
            lastKey = 'ArrowRight'
        break
    }
  
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp' :
            keys.ArrowUp.pressed = false 
        break
        case 'ArrowDown' :
            keys.ArrowDown.pressed = false 
        break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false 
        break
        case 'ArrowRight' :
            keys.ArrowRight.pressed = false 
        break
    }
})














//      const testBoundary = new Boundary({
//      position: {
//           x: 760,
//           y:250
//      }
// })
    

//     const movables = [background,testBoundary] // items que quiero que se muevan en el mapa
    

//     updateGame()
    

//     function updateGame(){
//      background.draw()
//      //    boundaries.forEach(boundary => {
//      //         boundary.draw()
//      //    })
//      testBoundary.draw()
//      player.draw()


//           // Colisión
//           if(player.position.x + player.width)

//         //Movimieto del background con las flechas
//         if(keys.ArrowUp.pressed) { movables.forEach(movable =>{movable.position.y += 3})}  
//         else if(keys.ArrowDown.pressed) { movables.forEach(movable =>{movable.position.y -= 3})}
//         else if(keys.ArrowLeft.pressed) { movables.forEach(movable =>{movable.position.x += 3})}
//         else if(keys.ArrowRight.pressed) { movables.forEach(movable =>{movable.position.x -= 3})}

    
       
//         requestAnimationFrame(updateGame)
//     }



//     //--> For para iterar el collisions           /Nuestro mapa mideo 70 x 40
//     for(let i = 0 ; i < collisions.length ; i += 70){ 
//          collisionsMap.push(collisions.slice(i, 70 + i))
//     }
   
//     collisionsMap.forEach((row,i) => {
//      row.forEach((symbol, j) => {
//           if (symbol === 1025)
//          boundaries.push(
//               new Boundary({
//                    position: {
//               x: j * Boundary.width + offset.x,
//               y: i * Boundary.height + offset.y
//          }}))   
//      })       
//     })

//     console.log(boundaries)

    

    


//     addEventListener("keydown", (event) =>{
//         event.preventDefault() //---> Con esto ya no se puede mover la pantalla con las teclas
//        switch (event.key){
//            case "ArrowUp":
//                 keys.ArrowUp.pressed = true
//            break
//            case "ArrowDown":
//                 keys.ArrowDown.pressed = true
//            break
//            case "ArrowLeft":
//                 keys.ArrowLeft.pressed = true
//            break
//            case "ArrowRight":
//              keys.ArrowRight.pressed = true
//            break
//        }
       
//       })

//       addEventListener("keyup", (event) =>{
//         event.preventDefault() //---> Con esto ya no se puede mover la pantalla con las teclas
//        switch (event.key){
//            case "ArrowUp":
//                 keys.ArrowUp.pressed = false
//            break
//            case "ArrowDown":
//                 keys.ArrowDown.pressed = false
//            break
//            case "ArrowLeft":
//                 keys.ArrowLeft.pressed = false
//            break
//            case "ArrowRight":
//              keys.ArrowRight.pressed = false
//            break
//        }
      
//       })


  






