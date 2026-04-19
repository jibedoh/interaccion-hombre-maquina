var vida = 80;
var ataqueMax = 25;
var defensa = 3;

var nivelEnemigo = 1;
var vidaEnemigo = 50;
var vidaEnemigoMax = 50;
var defensaEnemigo = 0;

function actualizar(mensaje) {

    document.getElementById("vida-vox").innerText = Math.floor(vida) + "/" + 80;
    document.getElementById("vida-alastor").innerText =  Math.floor(vidaEnemigo) + "/" + vidaEnemigoMax;
    document.getElementById("nivel").innerText = nivelEnemigo;
    document.getElementById("mensaje").innerText = mensaje;

    let porcJugador = (vida/80)*100;
    let porcEnemigo = (vidaEnemigo/vidaEnemigoMax)*100;
    
    document.getElementById("BarraVida-vox").style.width = Math.max(0, porcJugador) + "%";
    document.getElementById("BarraVida-alastor").style.width = Math.max(0, porcEnemigo) + "%";
}

function Calcular(){
    var ataque = (Math.random()*ataqueMax) +1;
    vidaEnemigo -=  ataque - defensaEnemigo;

    if(vidaEnemigo <0){
        vidaEnemigo=0;
    }
    console.log("Vox ataca! Daño realizado = " +  Math.floor(ataque));
    console.log("Vida Alastor = " + vidaEnemigo)
    let msg = "Vox ataca! Daño realizado = " +  Math.floor(ataque);



    if(vidaEnemigo <= 0){
        console.log("Alastor nivel " +  nivelEnemigo + " derrotado");
        msg= "Alastor nivel " +  nivelEnemigo + " derrotado";
        actualizar(msg);
        setTimeout(function(){
            SubirNivel();
        }, 1000);
        
        return;
    }

    var ataqueMaxEnemigo = 10 + (nivelEnemigo * 10);
    var ataqueEnemigo = (Math.random() *ataqueMaxEnemigo) + 12;
    var isEnemigo = Math.random();

    if(isEnemigo >= 0.5){
        var dañoJugador = ataqueEnemigo - defensa;
        if(dañoJugador < 1){
            dañoJugador = 1;
        }

        vida -= dañoJugador;
        console.log("Ataque recibido = " + Math.floor(ataqueEnemigo) + " Vida restante = " + Math.floor(vida));
        console.log("Vox fue atacado. Vida restante = " + vida);
        msg = "Ataque recibido = " + Math.floor(ataqueEnemigo) + " Vida restante = " + Math.floor(vida)
        actualizar(msg);


        
    }

    if(vida <= 0){
        vida = 0;
        msg= "Perdiste. Nueva Partida"
        actualizar(msg)
        setTimeout(function(){
            Resetear();
        },1000);
        alert("Perdiste");
        return;

    }

    
    actualizar(msg);
}

function SubirNivel(){
    nivelEnemigo ++;
    vidaEnemigo = 50 + (nivelEnemigo*10);
    vida = 80
    vidaEnemigoMax = vidaEnemigo;
    let msg = "Nuevo Alastor. Nivel = " + nivelEnemigo + ". Vida del nuevo Alastor = " + vidaEnemigo;
    console.log("Nuevo Alastor. Nivel = " + nivelEnemigo + ". Vida del nuevo Alastor = " + vidaEnemigo);
    console.log("Vida del nuevo Alastor = "+ vidaEnemigo)
    actualizar(msg);
}

function Resetear(){
    vida = 80;
    nivelEnemigo = 1;
    vidaEnemigo = 50;
    vidaEnemigoMax = vidaEnemigo;
    console.clear();
    console.log("Juego Reiniciado")
    let msg ="Juego Reiniciado";
    actualizar(msg);

}

