const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')





canvas.width = 1024
canvas.height = 576

//todo Creando Array 2D
const mapBound = []
for (let i = 0 ; i < collisions.length ; i += 70){
    mapBound.push(collisions.slice(i,70 + i))

}

//todo Creando Array 2D

const zombieZonesMap = []
for (let i = 0 ; i < zombieData.length ; i += 70){
    zombieZonesMap.push(zombieData.slice(i,70 + i))
}






//todo LLENAMOS A WALLS DE PAREDES Y LAS PINTAMOS CREANDO UN NEW Boundary
const walls = [] // Se llena de todos los 1025 que hay en "Collision.js"
const offset = { // Esto permite que los limites tomen la misma dimension del BG
    x: -1470,
    y: -700
}

//todo Iteramos el Array 2D buscando por cada SubArray los "1025" para crear un nuevo límite
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

//todo Iteramos el Array 2D buscando por cada SubArray los "1025" para crear una nueva zona de batalla
const battleZones = []

zombieZonesMap.forEach((row, i) => { // Este itera nuestro SubArray de "Collision.js"
    row.forEach((symbol, j) => { // Este itera lo que se encuentra adentro del SubArray
        if ( symbol === 1025) // Como los Limites estan epresentados por "1025" con esto le dicimos que solo tome en cuenta los que tienen este numero
        battleZones.push(new Boundary({
                position:{
                    x: j * Boundary.width + offset.x,
                 y: i * Boundary.height + offset.y
                }
            })
        )
    })
})



// ctx.fillStyle = 'White'
// ctx.fillRect(0,0,canvas.width,canvas.height)


// ------------------ WORLD   ------------------ //
const world = new Image()
world.src = 'images/LEVL5.png'
// ------------------ PLAYER   ------------------ //
const playerDown = new Image()
playerDown.src = 'images/playerDown.png'

const playerUp = new Image()
playerUp.src = 'images/playerUp.png'

const playerLeft = new Image()
playerLeft.src = 'images/playerLeft.png'

const playerRight = new Image()
playerRight.src = 'images/playerRight.png'










const player = new Sprite ({
    position:{
        x: canvas.width / 2 - 192 / 4 / 2, // --> lugar dond ese pinta la imágen (centro del canvas)
        y: canvas.height / 2 - 68 /2, // --> lugar dond ese pinta la imágen (centro del canvas)
    },
    image:playerDown,
    frames: {
        max:4,
        hold:10
    },
    sprites:{
        up: playerUp,
        left: playerLeft,
        right: playerRight,
        down:playerDown

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



const movables = [backgroundSprite, ...walls,...battleZones] // Variables que queremos que se muevan con el escenario

//todo CHECAR COLISIONES
function rectCollision ({rectangle1,rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

//todo activacion de batalla
const battle = {
    activated:false
}

//todo FUNCION PARA ANIMAR EL JUEGO (se crea un loop infinito)
function updateGame (){
    const requestID =  window.requestAnimationFrame(updateGame)
   
    backgroundSprite.draw()
    walls.forEach(wall => {
        wall.draw()
    })

    battleZones.forEach(battleZone => {
        battleZone.draw()
    })
    player.draw()

    
    //todo CONDICIONAL PARA MOVER EL BG DEPENDIENDO DELA TECLA QUE SE APRIETE Y SU VALOR FALSE/TRUE
    //todo ESTO AFECTA A EL BG EN SU POSICION Y/X AUMENTANDO O QUITANDO


    //todo esto actuva las zonas de batalla
    let moving = true
    player.animate = false

    if(battle.activated) return // si el modo batalla esta activado entonces no permite seguir co el codigo abajo y se detiene todo

    if(keys.ArrowDown.pressed||keys.ArrowUp.pressed||keys.ArrowLeft.pressed||keys.ArrowRight.pressed){
        for(let i = 0; i < battleZones.length; i++) {
            //todo CHECAR COLISIONES
            const battleZone = battleZones [i]
            const overZoneArea = // Esto nos permite sacar la zona que entrechoca el escenario de batalla y el personaje para de esa forma poder limitar nuestra zona de batalla sin activar al rozar el personaje.
            (Math.min(
                player.position.x + player.width,
                battleZone.position.x + battleZone.width
            ) -
            Math.max(player.position.x,battleZone.position.x)) * 
            (Math.min (
            player.position.y + player.height,
            battleZone.position.y + battleZone.height
            ) -
            Math.max(player.position.y,battleZone.position.y))

            if(
                rectCollision({
                        rectangle1:player,
                     rectangle2:battleZone
                    }) && overZoneArea > (player.width * player.height) / 2 
                    && Math.random() < 0.08
                ) {
                    // desactivar loop animado
                    window.cancelAnimationFrame(requestID)
                    battle.activated = true // activamos modo batalla 
                    gsap.to(".battle", { // SE USA LIBRERIA GSAP PARA ANIMACION DE BATALLA
                        opacity:1,
                        repeat:3,
                        yoyo:true,
                        duration:0.4,
                        onComplete(){
                            gsap.to(".battle", {
                                opacity:1,
                                duration:0.4,
                                onComplete(){

                                    // Activar un nuevo loop animado
                                    battleZombie()
                                    gsap.to(".battle", {
                                        opacity:0,
                                        duration:0.4
                                    })
                                }
                            })

                            
                            

                            
                        }
                    })
                break
            }
        }
    }

    
    if(keys.ArrowUp.pressed && lastKey === 'ArrowUp' ) {
        player.animate = true
        player.image = player.sprites.up
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
                
                moving = false
                break
            }
        }

       


        
        if(moving)
        movables.forEach(movable => {movable.position.y +=3})}

    else if(keys.ArrowDown.pressed && lastKey === 'ArrowDown'){
        player.animate = true
        player.image = player.sprites.down
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
                
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach(movable => {movable.position.y -=3})}


    else if(keys.ArrowLeft.pressed && lastKey === 'ArrowLeft'){
        player.animate = true
        player.image = player.sprites.left
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
                
                moving = false
                break
            }
        }
        if(moving)
        movables.forEach(movable => {movable.position.x +=3})}


    else if(keys.ArrowRight.pressed && lastKey === 'ArrowRight'){
        player.animate = true
        player.image = player.sprites.right
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
                
                moving = false
                break
            }
        }
        if(moving)
        
        movables.forEach(movable => {movable.position.x -=3})}


}
// updateGame()

// ------------------ BG BATTLE   ------------------ //
const battleBGImage = new Image()
battleBGImage.src = "images/battleBackground.png"

const battleBgSprite = new Sprite({position: {
        x:0,
        y:0
    },
    image: battleBGImage
})

//TODO FUNCION PARA CAMPO DE BATALLA

// ------------------ INSTANCIA ZOMBIE   ------------------ //

const zombieEnemyImg = new Image()
zombieEnemyImg.src = "./images/draggleSprite.png"

const zombie = new Sprite ({
        position: {
        x:790,
        y:100
    },
        image:zombieEnemyImg,
        frames: {
            max:4,
            hold:10
    },
        animate:true,
        isEnemy:true

})


// ------------------ INSTANCIA CARO   ------------------ //

const caroImg = new Image()
caroImg.src = "/images/playerUp.png"

const caro = new Sprite ({
        position: {
        x:400,
        y:300
    },
        image:caroImg,
        frames: {
            max:4,
            hold:10
    },
        animate:true
})



//TODO FUNCION PARA BATALLA ZOMBIE
function battleZombie(){
    window.requestAnimationFrame(battleZombie)
    
    battleBgSprite.draw()
    zombie.draw()
    caro.draw()
    
}

battleZombie()
// updateGame()


document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (event) =>{
        console.log(event.currentTarget.innerHTML)
                caro.attack({ 
                    attack: {
                name:'Abrazo',
                damage:10,
             type: 'Normal'
            },
            recipient:zombie
        })
    })
})


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











