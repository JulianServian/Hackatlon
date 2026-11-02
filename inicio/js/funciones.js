const empezar = document.querySelector("#iniciar");
const panel = document.querySelector("#panel-inicio");



export function botonEmpezar(){
    empezar.addEventListener("click", function(){
        panel.classList.add("mostrar");
        if(panel.className("mostrar")){
            panel.classList.remove("mostrar")
            panel.classList.add("oculto")
        }else{
            panel.classList.remove("oculto")
            panel.classList.add("mostrar")
        }
        
    })
}