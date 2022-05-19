// ------------------ BG BATTLE   ------------------ //
const battleBGImage = new Image()
battleBGImage.src = "/images/BattleZone2.png"

const battleBgSprite = new Sprite({position: {
        x:0,
        y:0
    },
    image: battleBGImage,
})


// ------------------ Creando imagenes de enemigos en batalla  ------------------ //





 //-------------Zombie
const zombieEnemy = new Sprite(monsters.Zombie)

//-------------Caro
const caro = new Sprite(monsters.Caro)



//TODO FUNCION PARA CAMPO DE BATALLA

const renderSprites = [zombieEnemy,caro] // Se pintan personajes para que los ataques queden al fondo

const button = document.createElement('button')
button.innerHTML = 'FireBall'
document.querySelector('#atacksBox').append(button)



function battleZombie(){

    window.requestAnimationFrame(battleZombie)
    console.log('NUEVA BATALLA')
    battleBgSprite.draw()
    renderSprites.forEach((sprite) => {
        sprite.draw()
    })
}

// updateGame()
// battleZombie()

const queue = []



//TODO COMENZAMOS A SELECCIONAR LOS ATTAQUES CON LOS addEventListener
document.querySelectorAll('button').forEach((button) => { 

    button.addEventListener('click', (event) => {
        console.log(event.currentTarget.innerHTML)
        const selectAttack = attacks[event.currentTarget.innerHTML]
        caro.attack({ 
                attack: selectAttack ,
            recipient: zombieEnemy,
            renderSprites
        })

        //Peierde el enemigo
        if(zombieEnemy.health <= 0){
            return
        }

      queue.push(()=>{
            zombieEnemy.attack({ 
                attack: attacks.Punch ,
                recipient: caro,
                renderSprites
            })
         })  

         queue.push(()=>{
            zombieEnemy.attack({ 
                attack: attacks.FireBall ,
                recipient: caro,
                renderSprites
            })
         })  
    })
    
})

document.querySelector('#dialogueBox').addEventListener('click', (event) =>{
    if(queue.length>0){
       queue[0]()
       queue.shift()
    }else event.currentTarget.style.display= 'none'
    console.log('click diaolguie')
})