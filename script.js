// FUNCIONALIDADE 1: validação do formulário

const form = document.getElementById("formBusca");

form.addEventListener("submit", function(event){

event.preventDefault();

const busca = document.getElementById("campoBusca").value;

if(busca === ""){
alert("Digite um destino!");
}
else{
alert("Buscando por: " + busca);
}

});


// FUNCIONALIDADE 2: efeito nas promoções

const promocao = document.querySelector(".promocao");

promocao.addEventListener("mouseover", function(){

promocao.style.background = "#ffe0b3";

});

promocao.addEventListener("mouseout", function(){

promocao.style.background = "#f5f5f5";

});


// FUNCIONALIDADE 3: rolagem suave

document.querySelectorAll("nav a").forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault();

const destino = document.querySelector(this.getAttribute("href"));

destino.scrollIntoView({
behavior:"smooth"
});

});

});
