//todo CLASE PARA ANIMAR EL BG CON POSITION EN EJE X / Y TOMANDO CONST "WORLD"
class Sprite {
    constructor({position, image, frames = {max: 1, hold: 10}, sprites = [],animate = false, rotation = 0}){
        this.position = position
        this.image = image
        this.frames = {...frames, val:0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        
       
        this.rotation = rotation
        
    }
    draw(){
        ctx.save()
        ctx.translate(this.position.x + this.width /2 ,this.position.y + this.height / 2)
        ctx.rotate(this.rotation)
        ctx.translate(-this.position.x - this.width /2 ,-this.position.y - this.height / 2)
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

        if(this.frames.elapsed % this.frames.hold === 0){ // Velocidad a la que queremos que se mueva
        
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }

    }


    attack({attack, recipient, renderSprites }){

        document.querySelector('#dialogueBox').style.display ='block'
        document.querySelector('#dialogueBox').innerHTML ='No momir Motto Meme!!!'
        let healthBar = '#enemyHealthBar'
        if(this.isEnemy) healthBar = '#playerHealthBar'

        let rotation = 1
        if(this.isEnemy) rotation = -3
        recipient.health = recipient.health - attack.damage 

        switch(attack.name){
            case 'FireBall':
                const fireBallImg = new Image()
                fireBallImg.src = './images/fireball.png'


            const fireBall = new Sprite({
                position:{
                    x: this.position.x ,
                    y: this.position.y
                },
                image: fireBallImg,
                frames:{
                    max:4,
                    hold:10
                },
                animate:true,
                rotation
            })

            renderSprites.splice(1,0,fireBall)


            //Animando la bola de fugo
            gsap.to(fireBall.position, {
                x:recipient.position.x,
                y:recipient.position.y,
                onComplete: ()=>{
                         
                    gsap.to(healthBar, {
                        width: recipient.health  + '%'   
                        })
                    gsap.to(recipient.position, {
                       x: recipient.position.x + 30,
                       yoyo:true,
                       repeat:5,
                       duration:0.08
                    })
    
                    gsap.to(recipient, {
                        opacity: 0,
                        repeat:5,
                        yoyo:true,
                        duration:0.08
                    })

                    renderSprites.splice(1,1)
                }
            })





            break    
            case 'Punch' :

                const timeLine = gsap.timeline()

               
        
                let movementDistance = 20
                if(this.isEnemy)movementDistance = -20
        
                
        
        
                timeLine.to(this.position, { // Mueve al enemigo de posicion al momento del ataque en su eje X
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    
        
                    onComplete: () => {
        
                        //Aqui se le baja la vida al enemigo con punchs
                        gsap.to(healthBar, { //! CHEAR PORQUE NO FUNCIONA L BARRA DE VIDA
                            width: recipient.health  + '%'   
                            })
                        gsap.to(recipient.position, {
                           x: recipient.position.x + 30,
                           yoyo:true,
                           repeat:5,
                           duration:0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat:5,
                            yoyo:true,
                            duration:0.08
                        })
                    }
                })
                .to(this.position, {
                    x: this.position.x
                })
            }
            
        }

            break    
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
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)' // Se pintan cuadros de colisiones y se dejan transparentes para que no se noten 
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}



class Monster extends Sprite {

    constructor({position, image, frames = {max: 1, hold: 10}, sprites = [],animate = false, rotation = 0,isEnemy=false, name}){
        super({
            
        })
        
        this.name = name
        this.health = 100
        this.isEnemy = isEnemy
    }
                
    attack({attack, recipient, renderSprites }){

        document.querySelector('#dialogueBox').style.display ='block'
        document.querySelector('#dialogueBox').innerHTML ='No momir Motto Meme!!!'
        let healthBar = '#enemyHealthBar'
        if(this.isEnemy) healthBar = '#playerHealthBar'

        let rotation = 1
        if(this.isEnemy) rotation = -3
        recipient.health = recipient.health - attack.damage 

        switch(attack.name){
            case 'FireBall':
                const fireBallImg = new Image()
                fireBallImg.src = './images/fireball.png'


            const fireBall = new Sprite({
                position:{
                    x: this.position.x ,
                    y: this.position.y
                },
                image: fireBallImg,
                frames:{
                    max:4,
                    hold:10
                },
                animate:true,
                rotation
            })

            renderSprites.splice(1,0,fireBall)


            //Animando la bola de fugo
            gsap.to(fireBall.position, {
                x:recipient.position.x,
                y:recipient.position.y,
                onComplete: ()=>{
                         
                    gsap.to(healthBar, {
                        width: recipient.health  + '%'   
                        })
                    gsap.to(recipient.position, {
                       x: recipient.position.x + 30,
                       yoyo:true,
                       repeat:5,
                       duration:0.08
                    })
    
                    gsap.to(recipient, {
                        opacity: 0,
                        repeat:5,
                        yoyo:true,
                        duration:0.08
                    })

                    renderSprites.splice(1,1)
                }
            })





            break    
            case 'Punch' :

                const timeLine = gsap.timeline()

               
        
                let movementDistance = 20
                if(this.isEnemy)movementDistance = -20
        
                
        
        
                timeLine.to(this.position, { // Mueve al enemigo de posicion al momento del ataque en su eje X
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    
        
                    onComplete: () => {
        
                        //Aqui se le baja la vida al enemigo con punchs
                        gsap.to(healthBar, { //! CHEAR PORQUE NO FUNCIONA L BARRA DE VIDA
                            width: recipient.health  + '%'   
                            })
                        gsap.to(recipient.position, {
                           x: recipient.position.x + 30,
                           yoyo:true,
                           repeat:5,
                           duration:0.08
                        })
        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat:5,
                            yoyo:true,
                            duration:0.08
                        })
                    }
                })
                .to(this.position, {
                    x: this.position.x
                })
            }
            
        }

            break    
        }
