const caroImg = new Image()
caroImg.src = "/images/playerUp.png"

const zombieImg = new Image()
zombieImg.src = "/images/monsterSprite-removebg-preview.png"



const monsters = {
    Caro: {

        position:{
            x:690,
            y:480
        },
        image:caroImg,
        frames: {
            max: 4,
            hold:20
        },
        animate: true,
        isEnemy: false,
        name: 'Caggo',
        attacks: [attacks.Punch,attacks.FireBall]
    },

    Zombie: {
        position:{
            x:860,
            y:250
        },
        image:zombieImg,
        frames: {
            max: 4,
            hold:20
        },
        animate: true,
        isEnemy: true,
        name: 'Zombie',
        attacks: [attacks.Punch,attacks.FireBall]
    }
}