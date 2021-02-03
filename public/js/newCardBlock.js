
let newCardBlock = (cards) => {
    
    if(cards.length >= 1){

      let card = document.querySelector(".add");
      card.style.opacity = "60%";

      let alert = document.createElement("nav");
      alert.setAttribute("class","nav-class");
      alert.innerHTML ="Salve Suas Anotações atuais antes de abrir novas";
      

      let body = document.querySelector("body");
      let previousAlert = document.querySelector(".nav-class");
      if(previousAlert){
        body.removeChild(previousAlert);
      }
    
      body.appendChild(alert);

    }else{
        cardGenerator(document.querySelector('#username').value); 
    }
    
}