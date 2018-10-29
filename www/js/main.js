// const fredDemo = (buttonNumber) => {
//     $(".fred-button:eq(" + (buttonNumber-1) + ")").addClass("active")
// }

var $secuencia=[];
var $apuntador=0;
var $tamanoArreglo;
var $apuntadorAuto=0;
var $relojImg=0;
var $relojComparacion=0;
var $score=0;
var audio = document.createElement("audio");

//al dar clic en el boton muestra el primer color y se desabilita el boton

function pintarColor(){
	$foco = Math.floor((Math.random() * 9) + 1);
	$secuencia.push($foco);
	console.log("el tamaño del arreglo es "+$tamanoArreglo)
    if($tamanoArreglo>=0){
    		console.log("entra al setInterval");
    		$relojImg = setInterval(cambiarColor,1000);  
    }
    else{
    	console.log("audio");
    	console.log("btn-"+$secuencia[$apuntadorAuto]);
    	audio.src = "audio/" + $secuencia[$apuntadorAuto] + ".mp3";
   		audio.autoplay = true;
    	//document.getElementById("btn-1").active()
    	//document.getElementById("btn-"+$secuencia[$apuntadorAuto]).classList.add("active");
    	//document.getElementById("btn-"+$secuencia[$apuntadorAuto]).focus();
    	
    	document.getElementById("btn-"+$secuencia[$apuntadorAuto]).classList.add("active");
    	setTimeout(function(){document.getElementById("btn-"+$secuencia[$apuntadorAuto]).classList.remove("active"); }, 1000);
    	//document.getElementById("btn-"+$secuencia[$apuntadorAuto]).classList.remove("active");
    	//}document.images["imagen"].src ="img/"+$foco+".jpg";
    }
    $tamanoArreglo=($secuencia.length)-1;
    console.log($secuencia); 
    //$relojImg = setInterval(cambiarColor,3000);
}

function cambiarColor(){
	console.log("apuntador auto"+$apuntadorAuto);

	//document.images["imagen"].src ="img/"+$secuencia[$apuntadorAuto]+".jpg";
	//document.getElementById("btn-"+$secuencia[$apuntadorAuto]).classList.add("active");
	//document.getElementById("btn-1").activeElement
	audio.src = "audio/" + $secuencia[$apuntadorAuto] + ".mp3";
    document.getElementById("btn-"+$secuencia[$apuntadorAuto]).classList.add("active");
    setTimeout(function(){document.getElementById("btn-"+$secuencia[$apuntadorAuto]).classList.remove("active"); }, 500);
   	audio.autoplay = true;
	//document.getElementById("btn-"+$secuencia[$apuntadorAuto]).focus();
	//document.getElementById("btn-"+$secuencia[$apuntadorAuto]).classList.add("fred-button.active");
	//console.log("cambia imagen auto"+ "img/"+$secuencia[$apuntadorAuto]+".jpg");
	
	if($apuntadorAuto===$tamanoArreglo){
		setTimeout(function(){document.getElementById("btn-"+$secuencia[$apuntadorAuto]).classList.remove("active"); }, 1000);
		console.log("detiene reloj");
		$apuntadorAuto=0;
		clearInterval($relojImg);
	}
	else{
		$apuntadorAuto=$apuntadorAuto+1;
	}
	//clearTimeout();
}

$("#btn-Play").on("click",function(e){
    document.getElementById("score-screen").innerHTML = $score;
	pintarColor();
    console.log ($score);
    document.getElementById("btn-Play").style.display = "none";
	//$("#btn-Play").prop("disabled", true);
	cronometro();
})

//oprimer uno de los botones y compara si es el mismo que el oprimido
$(".fred-button").on("click", function(e) {
    //let selectedButton = e.target;
    let $check = $(e.target).data("val")
    audio.src = "audio/" + $check + ".mp3";
    document.getElementById("btn-"+$check).classList.add("active");
    setTimeout(function(){document.getElementById("btn-"+$check).classList.remove("active"); }, 1000);
   	audio.autoplay = true;
    //let $check = $(e.target).getAttribute("data-val");
    recorrerArreglo(parseInt($check));
});

function recorrerArreglo($check){
	//setTimeout(stopGame,3000);
	console.log("inicia con el nuevo check:"+$check+" posicion del arreglo: "+$secuencia[$apuntador]);
	console.log("el apuntador: "+$apuntador+" y el tamaño del arreglo: "+$tamanoArreglo)
	if($check===$secuencia[$apuntador] && $apuntador===$tamanoArreglo){
		console.log("CORRECTO");
		$score=$score+1;
		console.log("siguiente nivel tu record es: "+$score);
		document.getElementById("score-screen").innerHTML = $score;
		pintarColor();
		$apuntador=0;
		//clearTimeout();
	}
	else if($check===$secuencia[$apuntador] && $apuntador<$tamanoArreglo){
		//clearTimeout();
		console.log("CORRECTO para time");
		$apuntador=$apuntador+1;
		//$relojComparacion = setInterval(cronometro,3000);
		console.log("inica cronometro");
	}
	else{
		stopGame();
		//console.log("GAME OVER");
		//location.href = 'index.html';
	}
}

function cronometro(){
	clearInterval($relojImg);
	var n = 0;
	var l = document.getElementById("number");
	window.setInterval(function(){
  	//l.innerHTML = n;
  	n++;
	},1000);
	if(n==3){
		console.log("GAME OVER"+typeof n);
		//clearInterval($relojImg);	
	}
}

function stopGame(){
	//location.href = 'index.html';
	audio.src = "audio/gameover.mp3";
   	audio.autoplay = true;
   	console.log("GAME OVER, tu score es de: "+$score);
}