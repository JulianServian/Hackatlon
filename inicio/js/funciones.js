const empezar = document.querySelector("#iniciar");
const panel = document.querySelector("#panel-inicio");

export function botonEmpezar(){
    empezar.addEventListener("click", function(){
        panel.classList.remove("mostrar")
        panel.classList.add("oculto")
    })
}

export function personajes(){
    
}

botonEmpezar();