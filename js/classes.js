//todo CLASE PARA ANIMAR EL BG CON POSITION EN EJE X / Y TOMANDO CONST "WORLD"
class Sprite {
    constructor({position, image, frames = {max: 1, hold: 10}, sprites = [], animate = false , rotation = 0, }){
        this.position = position
        this.image = new Image()
        this.frames = {...frames, val:0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
        this.image.src = image.src
        
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        this.rotation = rotation
        


        

    }
    draw(){
        ctx.save()
        ctx.translate(this.position.x + this.width / 2 ,this.position.y + this.height / 2  )
        ctx.rotate(this.rotation)
        ctx.translate(-this.position.x - this.width / 2 , -this.position.y - this.height / 2  )
        ctx.globalAlpha = this.opacity
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
        ctx.restore()

            //todo condicional para el movmiento del Sprite del personaje
        if(!this.animate) return

        if(this.frames.max > 1){
            this.frames.elapsed++
        }

        if(this.frames.elapsed % this.frames.hold === 0){
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }

    }

    
 
}

class Monster extends Sprite {
    constructor({position, image, frames = {max: 1, hold: 10}, sprites = [], animate = false , rotation = 0,isEnemy = false, name, attacks}) {

        super({position, image, frames,sprites, animate, rotation,isEnemy, name})
        this.health = 100
        this.isEnemy = isEnemy
        this.name = name
        this.attacks = attacks
        
        
    }

    faint(){
        document.querySelector('#dialogueBox').innerHTML = this.name + ' PERDITE! '
        
        gsap.to(this.position, {
            y: this.postion + 20
        })
        gsap.to(this, {
            opacity: 0
        })
        audio.battle.stop()
        audio.victory.play()
    }

    

    attack({attack,recipient, renderedSprites}){

        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = this.name + ' te atacó con ' + attack.name

        let healthBar = '#enemyHealthBar'
        if(this.isEnemy) healthBar = '#playerHealthBar'

        let rotation = 1
        if(this.isEnemy) rotation = -2.2
        

        recipient.health -= attack.damage


        switch (attack.name) {

                case 'Fireball':
                audio.initFireBall.play()
                const fireballImg = new Image()
                fireballImg.src = 'images/fireball.png'

                const fireball = new Sprite({
                    position: {
                        x:this.position.x,
                        y:this.position.y
                    },
                    image:fireballImg,
                    frames:{
                        max:4,
                        hold:10
                    },
                    animate:true,
                    rotation: 1
                    
                })

                
                renderedSprites.splice(1,0,fireball)

                gsap.to(fireball.position, {
                    x:recipient.position.x,
                    y:recipient.position.y,
                    onComplete: () => {

                         //Aqui es donde se golpea al enemigo
                         audio.fireBallHit.play()
                    gsap.to(healthBar, {
                        width: recipient.health + '%'
                        } )
                        gsap.to(recipient.position, {
                        x:recipient.position.x + 10,
                        yoyo:true,
                        repeat:5,
                        duration:0.08
                     })
    
                        gsap.to(recipient, {
                        opacity:0,
                        repeat:5,
                        yoyo:true,
                        duration: 0.08
                        })

                        
                       renderedSprites.splice(1,1)
                    }
                })


                break

                case 'Tackle':

                const tl = gsap.timeline()
        
                

                let movementDistance = 20
                if(this.isEnemy) movementDistance = -20

                
                tl.to(this.position, {
                x:this.position.x - movementDistance
                }).to(this.position, {
                x:this.position.x + movementDistance * 2,
                duration:0.1,
                onComplete : () => {

                    //Aqui es donde se golpea al enemigo

                    audio.tackleHit.play()


                    gsap.to(healthBar, {
                    width: recipient.health + '%'
                    } )
                    gsap.to(recipient.position, {
                    x:recipient.position.x + 10,
                    yoyo:true,
                    repeat:5,
                    duration:0.08
                 })

                    gsap.to(recipient, {
                    opacity:0,
                    repeat:5,
                    yoyo:true,
                    duration: 0.08
                    })
                }
                    }).to(this.position, {
                    x:this.position.x
            })

            break
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
        ctx.fillStyle = 'rgba(255, 0, 0, 0.0)' // Se pintan cuadros de colisiones y se dejan transparentes para que no se noten 
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}