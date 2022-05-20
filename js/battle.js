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
let zombie 

// ------------------ INSTANCIA CARO   ------------------ //
let caro

let renderedSprites 
let queue




//TODO FUNCION PARA BATALLA ZOMBIE



let battleAnimationId

function initBattle(){
    document.querySelector('#userInterface').style.display = ' block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()

    zombie = new Monster (monsters.Zombie)
    caro = new Monster (monsters.Caggo)
    renderedSprites = [zombie, caro]
    queue = [ ]

    caro.attacks.forEach(attack => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attacksBox').append(button)
    })


    document.querySelectorAll('button').forEach ((button) => {

        button.addEventListener('click', (e) => {

        const selectedAttack = attacksArray[e.currentTarget.innerHTML]
        caro.attack({ 
            attack: selectedAttack ,
            recipient:zombie,
            renderedSprites
        })

        if(zombie.health <= 0) {
            queue.push(()=>{
                zombie.faint()
            })
            queue.push(()=>{
                //Cuando se pierde volvemos a la pantalla de negro
                gsap.to('.battle', {
                    opacity:1,
                    onComplete: () => {
                        cancelAnimationFrame(battleAnimationId)
                        updateGame()
                        document.querySelector('#userInterface').style.display = 'none'

                        gsap.to('.battle', {
                            opacity:0
                        })

                        battle.activated = false

                        audio.Map.play()
                    }
                })


            })
        }



        queue.push(() => {

            zombie.attack({ 
                attack: attacksArray.Tackle ,
                recipient:caro,
                renderedSprites
            })

        })

        queue.push(() => {

            zombie.attack({ 
                attack: attacksArray.Tackle ,
                recipient:caro,
                renderedSprites
            })

        })

        if(caro.health <= 0) {
            queue.push(()=>{
                caro.faint()

                queue.push(()=>{
                    //Cuando se pierde volvemos a la pantalla de negro
                    gsap.to('.battle', {
                        opacity:1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            updateGame()
                            document.querySelector('#userInterface').style.display = 'none'

                            gsap.to('.battle', {
                                opacity:0
                            })

                            battle.activated = false
                            audio.Map.play()
                        }
                    })


                })
            })
        }
    })

    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacksArray[e.currentTarget.innerHTML]
        document.querySelector('#attackType').innerHTML = selectedAttack.type
        document.querySelector('#attackType').style.color = selectedAttack.color


        console.log('go')
    })

})
}

function battleZombie(){
    battleAnimationId = window.requestAnimationFrame(battleZombie)
    battleBgSprite.draw()

    console.log(battleAnimationId)

    renderedSprites.forEach(sprite => {
    sprite.draw()
    })

}
// initBattle()
// battleZombie()
updateGame()






document.querySelector("#dialogueBox").addEventListener('click', (event) => {
    if(queue.length > 0) {
        queue[0]()
        queue.shift()
    }else event.currentTarget.style.display = 'none'

})