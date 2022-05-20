

const monsters = {
    Caggo: {
        position: {
            x:400,
            y:300
        },
            image: {
             src:'images/playerUp.png'},
            frames: {
            max:4,
            hold:10
        },
            animate:true,
            name:'Caggo',
            attacks: [attacksArray.Tackle,attacksArray.Fireball]
    },
    Zombie: {
            position: {
            x:790,
            y:100
        },
            image:{
                src:'images/draggleSprite.png'},
            frames: {
            max:4,
            hold:10
        },
            animate:true,
            isEnemy:true,
            name:'Zombie',
            attacks: [attacksArray.Tackle,,attacksArray.Fireball ]

    }
}