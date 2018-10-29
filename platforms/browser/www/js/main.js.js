var $secuencia=[];
var $apuntador=0;
var $tamanoArreglo;
var $apuntadorAuto=0;
var $relojImg=0;
var $relojComparacion=0;
var $score=0;
//al dar clic en el boton muestra el primer color y se desabilita el boton

function pintarColor(){
	$foco = Math.floor((Math.random() * 9) + 1);
	$secuencia.push($foco);
	console.log("el tamaño del arreglo es "+$tamanoArreglo)
    if($tamanoArreglo>=0){
    		console.log("entra al setInterval");
    		$relojImg = setInterval(cambiarColor,2000);  
    }
    else{
    	document.images["imagen"].src ="img/"+$foco+".jpg";
    }
    $tamanoArreglo=($secuencia.length)-1;
    console.log($secuencia); 
    //$relojImg = setInterval(cambiarColor,3000);
}

function cambiarColor(){
	console.log("apuntador auto"+$apuntadorAuto);
	document.images["imagen"].src ="img/"+$secuencia[$apuntadorAuto]+".jpg";
	console.log("cambia imagen auto"+ "img/"+$secuencia[$apuntadorAuto]+".jpg");
	
	if($apuntadorAuto===$tamanoArreglo){
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
//    pintarColor();
    console.log ($score);
    document.getElementById("btn-Play").style.display = "none";
	$("#btn-Play").prop("disabled", true);
//	cronometro();
})

//oprimer uno de los botones y compara si es el mismo que el oprimido
$(".check").on("click", function(e) {
    let selectedButton = e.target;
    let $check = $(e.target).val();
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
		console.log("GAME OVER");
		location.href = 'index.html';
	}
}

function cronometro(){
	clearInterval($relojImg);
	var n = 0;
	var l = document.getElementById("number");
	window.setInterval(function(){
  	l.innerHTML = n;
  	n++;
	},1000);
	if(n==3){
		console.log("GAME OVER"+typeof n);
		//clearInterval($relojImg);	
	}
}

function stopGame(){
	console.log("GAME OVER, tu score es de: "+$score);
	location.href = 'index.html';
}