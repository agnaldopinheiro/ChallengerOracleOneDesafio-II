
var listadePalavras = ['ARGELIA','ARGENTINA','ARMENIA','BARBADOS','BELGICA','BELIZE','CAMAROES','CAMBOJA','CANADA','ESLOVENIA','ESCOCIA','GUATEMALA','HOLANDA',
'HONDURAS','IRAQUE','JAMAICA','LIBANO','MEXICO','NIGERIA','NORUEGA','POLONIA','PORTUGAL','ROMENIA','SUDAO','SUECIA','URUGUAI','VENEZUELA','ABRICO','ABACATE','ABACAXI',
'CARAMBOLA','CUPUAÇU','FRAMBOESA','GOIABA','GUARANA','JABUTICABA','MACADAMIA','MARACUJA','MEXERICA','TAMARINDO','ARROJADO','AJUIZADO','BRILHANTE','BENFEITOR','COMPETENTE',
'COOPERADOR','CHARMOSO','DESLUMBRANTE','DIPLOMATICO','EXTRAORDINARIO','ENCANTADOR','ENTUSIASMADO','FASCINANTE','GENIAL','HABILIDOSO','INSPIRADOR','INTEGRO',
'JEITOSO','LETRADO','MAGISTRAL','MODESTO','OBSTINADO','PONDERADO','PERSEVERANTE','RESPEITOSO','TALENTOSO','VENERAVEL','ANDORINHA','AVESTRUZ','BORBOLETA','CAMUNDONGO',
'CASCAVEL','CROCODILO','DROMEDARIO','ESQUILO','FLAMINGO','GAFANHOTO','GOLFINHO','HIPOPOTAMO','IGUANA','JUMENTO','LAGARTIXA','LESMA','MARIPOSA','MINHOCA','OVELHA','PERNILONGO',
'RINOCERONTE','TAMANDUA']

var listaDicas = ['NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS',
'NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS',
'NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE PAÍS','NOME DE FRUTA','NOME DE FRUTA',
'NOME DE FRUTA','NOME DE FRUTA','NOME DE FRUTA','NOME DE FRUTA','NOME DE FRUTA','NOME DE FRUTA','NOME DE FRUTA','NOME DE FRUTA','NOME DE FRUTA','NOME DE FRUTA',
'NOME DE FRUTA','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO',
'TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO',
'TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO','TIPO DE ELOGIO',
'TIPO DE ELOGIO','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL',
'NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL',
'NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL','NOME DE ANIMAL']

console.log(listadePalavras.length)
console.log(listaDicas.length)

let imagem = []
let palavraSorteada = ""
let soletraPalavra = []
let dicaPalavra = ""
var letrasCertas = []
var letrasErradas = []
var contaErros = 0
var contaAcertos = 0
var jogando = false
let campoSegredo = []
let ganhou = true
let vitorias = 0
let derrotas = 0
//var adicionandoPalavras = document.querySelector(".adicionaPalavra");
document.getElementById("telaAdiciona").style.display = "none";
document.getElementById("ResFinal").style.display = "none";

// Leitura do teclado da tela de jogo
teclado = document.querySelectorAll(".teclado")

// Verifica a letra jogada contra a palavraSorteada
teclado.forEach(letra => {
	letra.addEventListener("click", function () {
	if (jogando == true) {
	    letra.style.setProperty("background", "gray")
	    letra.disabled = true
	    var letraEntrada = letra.value;
	    console.log(letraEntrada)
	    console.log(tamanhodaPalavra)
	    //Testando a letra escolhida pelo jogador
	    if (soletraPalavra.includes(letraEntrada)) { // se letra escolhida está na palavra, acerto!
	    	//Procurando os lugares certos no array soletraPalavra e inserindo no array campoSegredo
	    	for (let i=0; i<tamanhodaPalavra; i++) {					
					if (soletraPalavra[i] == letraEntrada) {
						campoSegredo[i] = letraEntrada
						contaAcertos = contaAcertos + 1
	            		acertouLetra()
					}
			}
	    } else { //letra escolhida não está na palavra, erro!
	            letrasErradas.push(letraEntrada)
	            errouLetra(letraEntrada)
	            contaErros = contaErros + 1
	            document.getElementById("imagem").src = imagem[contaErros]	           
	    }
	    verificaJogo() //verificar se já acabou por acerto total ou por erro total
	}
    })
}) 

function inicializar() {

	console.log(listadePalavras)
	contaErros = 0
	contaAcertos = 0
	imagem = ["img/forcacaveira10b.png","img/forcacaveira5b.png","img/forcacaveira6b.png", 
	"img/forcacaveira7b.png","img/forcacaveira8b.png","img/forcacaveira9b.png","img/forcacaveira10b.png"]
	palavraSorteada = sorteiaPalavra()
	soletraPalavra = palavraSorteada.split("") // separando letra por letra
	tamanhodaPalavra = palavraSorteada.length //quantidade de letras
	// pega a posição sorteada na listaPalavras e seleciona a mesma para dicas e busca
	dicaPalavra = listaDicas[listadePalavras.indexOf(palavraSorteada)] 
	console.log(palavraSorteada)
	console.log(dicaPalavra)
	console.log(soletraPalavra)

	// apagar letras erradas na tela
	var tec = document.querySelector(".resultaErros")
	tec.textContent = ""
	
	campoSegredo = []

	var tabuleiro = document.querySelector(".palavraSecreta");
	tabuleiro.textContent = ""
	
	for (let i=0; i<tamanhodaPalavra; i++) {
		// Cria array contendo sequencia de traços do tamanho da palavra secreta
		campoSegredo[i] = "_"

		// cria campos com traços na tela
		var h2 = document.createElement("h2");
		h2.classList.add("letrajogada")
		h2.textContent = "_"
		var div = document.querySelector(".palavraSecreta")
		div.appendChild(h2)

		// voltar cor do teclado da tela e reabilita teclas
		teclado = document.querySelectorAll(".teclado")
		teclado.forEach(letra => {
	    letra.style.setProperty("background", "orangered")
	    letra.disabled = false
		})	
	}
	jogarForca()	
}

function jogarForca() {

	document.getElementById("imagem").src = "img/forcacaveira4.png"
	document.getElementById("telaAdiciona").style.display = "none";
	document.getElementById("ResFinal").style.display = "none";
	
	var h1 = document.querySelector("#texdica")
	h1.textContent = "Dica: " + dicaPalavra
	
	jogando=true

}

function verificaJogo() {
	
	if (contaErros >= 6) {
		
		ganhou = false;
		derrotas = derrotas + 1
		ResFinal()
		// apaga os traços 
		var tabuleiro = document.querySelector(".palavraSecreta");
		tabuleiro.textContent = ""
		// mostra a palavra sorteada
		var h2 = document.createElement("h2");
		h2.classList.add("letrajogada");
		h2.textContent = palavraSorteada;
		// mostra imagem 
		var div = document.querySelector(".palavraSecreta");
		div.appendChild(h2);
		document.getElementById("imagem").src = "img/forcacaveira10b.png"

		jogando = false;
	}

	if ((contaAcertos) == tamanhodaPalavra){
		
		vitorias = vitorias + 1
		ganhou = true;
		ResFinal(ganhou)
		jogando = false;
	}
}   

function acertouLetra() {
	//apaga tudo no campoSegredo
	var apagaCampo = document.querySelector(".palavraSecreta")
	apagaCampo.textContent = ""
	// escreve na tela tudo que está no array campoSegredo
	campoSegredo.forEach(letra => {
		var h2 = document.createElement("h2");
		h2.classList.add("letrajogada")
		h2.textContent = letra
		var div = document.querySelector(".palavraSecreta")
		div.appendChild(h2)
	})
}

function errouLetra(letraEntrada) {

	if (contaErros == 0) {
		var h2 = document.createElement("h2");
		h2.style.setProperty("background", "orangered")
		h2.classList.add("letrasErradas")
		h2.textContent = "Erros:"
		var div = document.querySelector(".resultaErros")
		div.appendChild(h2)
	}

	var h2 = document.createElement("h2");
	h2.style.setProperty("background", "orangered")
	h2.style.setProperty("border", "2px solid")
	h2.classList.add("letrasErradas")
	h2.textContent = letraEntrada
	var div = document.querySelector(".resultaErros")
	div.appendChild(h2)
}

function ResFinal(){
	console.log(ganhou)
	document.getElementById("ResFinal").style.display = "flex";
	var msg = document.querySelector("#Resultado")
	if (ganhou == false) {
		msg.textContent = "Fim de Jogo!" + " Vitorias: " + vitorias + " Derrotas: " + derrotas
	} else {
		msg.textContent = "Parabéns, você ganhou!" + " Vitorias: " + vitorias + " Derrotas: " + derrotas
		console.log("xi")
	}
}

function sorteiaPalavra() {
	let quantidadePalavras = listadePalavras.length;
	let numeroSorteado = parseInt(Math.random() * (quantidadePalavras));
	//console.log(numeroSorteado)
	return listadePalavras[numeroSorteado];
}

function NovaPalavra() {
	
	var inputPalavra = document.getElementById("palavra").value.toLowerCase();
  	var inputDica = document.getElementById("dica").value;
  	//listadePalavras.push(inputPalavra);
  	if (inputPalavra != "" & inputDica != ""){
	  	listaDicas.push(inputDica);
	  	console.log(inputPalavra)
	  	console.log(inputDica)
	  	verificaPalavra(inputPalavra)
  	} else {
	  	alert("Preencha os dois campos, palavra e dica")
  	}
  	document.getElementById("palavra").value = ""
  	document.getElementById("palavra").focus()	
}

function inserirPalavra(){

	//apenas para limpar jogo e tela se está em andamento
	inicializar()
	//exibe campos para inserção
	document.getElementById("telaAdiciona").style.display = "flex";
	document.getElementById("palavra").focus()
}

function verificaPalavra(palavraNova) {
	
		palavraNova = palavraNova.toUpperCase()
		console.log(palavraNova);
		palavraNova = palavraNova.replace(/Á/g, "A");
		palavraNova = palavraNova.replace(/Â/g, "A");
		palavraNova = palavraNova.replace(/Ã/g, "A");
		palavraNova = palavraNova.replace(/É/g, "E");
		palavraNova = palavraNova.replace(/Ê/g, "E");
		palavraNova = palavraNova.replace(/Í/g, "I");
		palavraNova = palavraNova.replace(/Ó/g, "O");
		palavraNova = palavraNova.replace(/Ô/g, "O");
		palavraNova = palavraNova.replace(/Õ/g, "O");
		palavraNova = palavraNova.replace(/Ú/g, "U");
		console.log(palavraNova);

		if (listadePalavras.includes(palavraNova)) { 
			alert("Esta palavra já existe na lista. Escolha outra.")
		} else {
		listadePalavras.push(palavraNova) // adiciona a nova palavra no array
		alert("Palavra nova inserida com sucesso!")
		}
}

