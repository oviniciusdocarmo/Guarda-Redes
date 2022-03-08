
var posXGoleiro, posYGoleiro = 50;
var posXBola, posYBola, posXPoder, posYPoder, posXGary, posYGary, posXVida, posYVida, posXJuiz, posYJuiz;
var tela = 1;
var imgBola, imgVida, imgPoder, imgGoleiro1, imgGoleiro2, imgGoleiro3, imgGoleiro4, imgGary, imgJuiz;
var nivel, velocidade;

var bolasDefendidas = 0, gols = 0, recorde = 0;

var espaco = false;

function setup() {
	createCanvas(900, 625);
	posXBola = random(100, 800);
	posYBola = 625;
	posXPoder = random(100, 800);
	posYPoder = -100;
	posXGary = random(100, 800);
	posYGary = -100;
	posXVida = random(100, 800);
	posYVida = -110;
}

function preload() {
	imgBola = loadImage('IMAGENS/SoccerBall.png');
	imgGoleiro1 = loadImage('IMAGENS/Manuel_Neuer.png');
	imgGoleiro2 = loadImage('IMAGENS/Cassio.png');
	imgGoleiro3 = loadImage('IMAGENS/Alex_Muralha.png');
	imgGoleiro4 = loadImage('IMAGENS/flash.png');
	imgVida = loadImage('IMAGENS/vida.png');
	imgPoder = loadImage('IMAGENS/Poder.png');
	imgGary = loadImage('IMAGENS/Gary.png');
	imgJuiz = loadImage('IMAGENS/juiz.png');
}

function draw() {
	if(tela == 1){
		posXGoleiro = 450;
		bolasDefendidas =0, gols=0;
		nivel=1, velocidade = 5;
		createCanvas(900, 625);
		posYBola = 625;
		posYPoder = -100;
		posYGary = -100;
		posYVida = -110;
		posYJuiz = -50;
		
		
		background(0)
		
		textSize(80);
		fill(255);
		text("Guarda-Redes", 210, 312);
		textSize(15);
		fill(255); 
		text("APERTE ENTER PARA INICIAR", 365, 570);
		text("APERTE SHIFT PARA VISUALIZAR O RECORDE", 300, 595);
		if (keyIsDown(ENTER) ) {
			tela = 2;  
		}
		if (keyIsDown(SHIFT) ) {
			background(0)
			textSize(20);
			fill(255); 
			text("RECORDE: "+ recorde+" Defesas", 350, 312);
		}
	}
	
	
	else if (tela == 2){
		
		
		//Desenho do campo
		background("#088A08")
	
		stroke(255, 255, 255);
		strokeWeight(5);
		line(210, 20, 210, 200);
		line(210, 200, 690, 200);
		line(690, 200, 690, 20);
		
		line(20, 20, 20, 400);
		line(20, 400, 880, 400);
		line(880, 400, 880, 20);
		
		noFill();
		rect(320, 400, 280, 63, 0, 0, 300, 300)
		
		noStroke();
		fill(255, 255, 255);
		ellipse(450, 300, 20, 20);
		
		stroke(255, 0, 0);
		line(0, 20, 900, 20);
		
		noStroke();
		noFill();
		
		
		//Objetos
		if (posYBola>0){
			posYBola -= 2+nivel;
			if (posYBola>605){
				posXBola = random(100, 800);
			}
		}else{
			posYBola = 625;
			gols++;
		}
		image(imgBola, posXBola,posYBola);
		
		
		if(velocidade<20){
			if (posYPoder>-1600){
				posYPoder -= 2;
				if (posYPoder>605){
					posXPoder = random(820);
				}
			}else{
				posYPoder = 625;
			}
		}
		image(imgPoder, posXPoder,posYPoder);
		
		
		
		if(velocidade>5){
			if (posYGary>-1200){
				posYGary -= 1;
				if (posYGary>605){
					posXGary = random(820);
				}
			}else{
				posYGary = 625;
			}
		}
		image(imgGary, posXGary,posYGary);
		
		
		
		if(gols>0){
			if (posYVida>-900){
				posYVida -= 2;
				if (posYVida>605){
					posXVida = random(820);
				}
			}else{
				posYVida = 625;
			}
		}
		image(imgVida, posXVida,posYVida);
		
		
		
		if(espaco == false){
			if(keyIsDown(32)){
				posXJuiz = posXGoleiro;
				if (posYJuiz<625){
					espaco = true;
					posYJuiz = posYGoleiro;
				}else{
					espaco = false;
				}
			}
		}
		if(espaco == true){
			
			//Distancia dos objetos até o juiz
			var distanciaVJ = int(dist(posXVida, posYVida, posXJuiz+25, posYJuiz+25));
			if(distanciaVJ <= 50){
				if(gols>0 && gols<3 ){
					gols--;
				}
				posYVida = -110;
				posYJuiz = -50;
				espaco = false;
			}
			var distanciaBJ = int(dist(posXBola, posYBola, posXJuiz+25, posYJuiz+25));
			if(distanciaBJ <= 50){
				bolasDefendidas++;
				if(bolasDefendidas%10==0){
					nivel++;
				}
				posYBola = 625;
				posYJuiz = -50;
				espaco = false;
			}
			var distanciaPJ = int(dist(posXPoder, posYPoder, posXJuiz+25, posYJuiz+25));
			if(distanciaPJ <= 70){
				if(velocidade<20){
					velocidade+=5;
				}
				posYPoder = -100;
				posYJuiz = -50;
				espaco = false;
			}
			var distanciaGJ = int(dist(posXGary, posYGary, posXJuiz+25, posYJuiz+25));
			if(distanciaGJ <= 50){
				if(velocidade>5){
					velocidade-=5;
				}
				posYGary = -100;
				posYJuiz = -50;
				espaco = false;
			}
			
			if (posYJuiz<625){
				posYJuiz += 10;
			}else{
				posYJuiz = -50;
				espaco = false;
			}
		}
		image(imgJuiz, posXJuiz, posYJuiz);
		
		
		//Movimentação
		if (keyIsDown(LEFT_ARROW))
			posXGoleiro-=velocidade;

		if (keyIsDown(RIGHT_ARROW))
			posXGoleiro+=velocidade;
		
		if (posXGoleiro>800){
			posXGoleiro = 800;
		}
		if (posXGoleiro< 0){
			posXGoleiro = 0;
		}
		
		
		//Distancia dos objetos até o goleiro
		var distanciaPG = int(dist(posXPoder, posYPoder, posXGoleiro+25, posYGoleiro+25));
		if(distanciaPG <= 70){
			if(velocidade<20){
				velocidade+=5;
			}
			posYPoder = -100;
		}
		var distanciaGG = int(dist(posXGary, posYGary, posXGoleiro+25, posYGoleiro+25));
		if(distanciaGG <= 50){
			if(velocidade>5){
				velocidade-=5;
			}
			posYGary = -100;
		}
		var distanciaBG = int(dist(posXBola, posYBola, posXGoleiro+25, posYGoleiro+25));
		if(distanciaBG <= 70){
			bolasDefendidas++;
			if(bolasDefendidas%10==0){
				nivel++;
			}
			posYBola = 625;
		}
		var distanciaVG = int(dist(posXVida, posYVida, posXGoleiro+25, posYGoleiro+25));
		if(distanciaVG <= 80){
			if(gols>0 && gols<3 ){
				gols--;
			}
			posYVida = -110;
		}
		
		
		//Pontuação
		fill("#F7FE2E");
		textSize(20);
		text("Defesas: " + bolasDefendidas, 40, 450);
		text("Gols: " + gols, 40, 475);
		text("Nível: " + nivel, 40, 500);
		noFill();
		
		
		if(velocidade == 10){
			image(imgPoder, 30, 515);
		}else if(velocidade == 15){
			image(imgPoder, 30, 515);
			image(imgPoder, 60, 515);
		}else if(velocidade == 20){
			image(imgPoder, 30, 515);
			image(imgPoder, 60, 515);
			image(imgPoder, 90, 515);
		}
		
		
		if(gols == 0){
			image(imgVida, 120, 460);
			image(imgVida, 145, 460);
			image(imgVida, 170, 460);
			if(velocidade==20){
				image(imgGoleiro4, posXGoleiro,posYGoleiro);
			}else{
				image(imgGoleiro1, posXGoleiro,posYGoleiro);
			}
		}else if(gols == 1){
			image(imgVida, 120, 460);
			image(imgVida, 145, 460);
			if(velocidade==20){
				image(imgGoleiro4, posXGoleiro,posYGoleiro);
			}else{
				image(imgGoleiro2, posXGoleiro,posYGoleiro);
			}
		}else if(gols == 2){
			image(imgVida, 120, 460);
			if(velocidade==20){
				image(imgGoleiro4, posXGoleiro,posYGoleiro);
			}else{
				image(imgGoleiro3, posXGoleiro,posYGoleiro);
			}
		}else{
			tela = 3;
			
		}
		
	}
	
	else if(tela == 3){
		background(0)
		fill(255);
		textSize(20);
		text("GAME OVER!!!!   :C", 360, 300);
		text("Defesas: " + bolasDefendidas, 395, 330);
		text("PRESSIONE ESPAÇO PARA JOGAR NOVAMENTE", 200, 595);
		if(bolasDefendidas > recorde){
			recorde = bolasDefendidas;
		}
		if(keyIsDown(32)){
			tela = 1;
		}
	}
	
}
