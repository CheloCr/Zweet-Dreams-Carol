window.onload = function(){
    
    const player = new Player ()
    

    updateGame()
    

    function updateGame(){
      
        background.draw()
        player.draw()

        //Movimieto del background con las flechas
        if(keys.ArrowUp.pressed) background.position.y = background.position.y + 3
        if(keys.ArrowDown.pressed) background.position.y = background.position.y - 3
        if(keys.ArrowLeft.pressed) background.position.x = background.position.x + 3
        if(keys.ArrowRight.pressed) background.position.x = background.position.x - 3

    
        

        
        

        requestAnimationFrame(updateGame)
    }


    addEventListener("keydown", (event) =>{
        event.preventDefault() //---> Con esto ya no se puede mover la pantalla con las teclas
       switch (event.key){
           case "ArrowUp":
                keys.ArrowUp.pressed = true
           break
           case "ArrowDown":
                keys.ArrowDown.pressed = true
           break
           case "ArrowLeft":
                keys.ArrowLeft.pressed = true
           break
           case "ArrowRight":
             keys.ArrowRight.pressed = true
           break
       }
       console.log(keys)
      })

      addEventListener("keyup", (event) =>{
        event.preventDefault() //---> Con esto ya no se puede mover la pantalla con las teclas
       switch (event.key){
           case "ArrowUp":
                keys.ArrowUp.pressed = false
           break
           case "ArrowDown":
                keys.ArrowDown.pressed = false
           break
           case "ArrowLeft":
                keys.ArrowLeft.pressed = false
           break
           case "ArrowRight":
             keys.ArrowRight.pressed = false
           break
       }
       console.log(keys)
      })


  
}






