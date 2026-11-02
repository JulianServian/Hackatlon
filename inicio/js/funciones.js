
export function paracaidasPersonaje(){
    if(divPersonajes == estado["cayendo"]){
        divPersonajes.innerHTML += `<img src="./img/paracaidas.gif" alt"" class="personaje">`
        estado["cayendo"] = estado["paracaidas"];
    }
}

personajes.addEventListener("click", paracaidasPersonaje);