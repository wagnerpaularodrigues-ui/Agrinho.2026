let jogador;
let sementes = [];
let aguas = [];
let poluicoes = [];

let pontos = 0;
let sustentabilidade = 100;
let estado = "inicio";

function setup() {
  createCanvas(900, 600);

  jogador = {
    x: width / 2,
    y: height - 80,
    tamanho: 40
  };

  for (let i = 0; i < 8; i++) {
    sementes.push(novoItem("semente"));
  }

  for (let i = 0; i < 5; i++) {
    aguas.push(novoItem("agua"));
  }

  for (let i = 0; i < 4; i++) {
    poluicoes.push(novoItem("poluicao"));
  }
}

function draw() {

  if (estado == "inicio") {
    telaInicio();
    return;
  }

  if (estado == "vitoria") {
    telaVitoria();
    return;
  }

  if (estado == "derrota") {
    telaDerrota();
    return;
  }

  background(120, 200, 100);

  fill(80, 180, 80);
  rect(0, 450, width, 150);

  moverJogador();
  desenharJogador();

  mostrarHUD();

  atualizarSementes();
  atualizarAguas();
  atualizarPoluicoes();

  if (pontos >= 200) {
    estado = "vitoria";
  }

  if (sustentabilidade <= 0) {
    estado = "derrota";
  }
}

function telaInicio() {
  background(135, 206, 235);

  textAlign(CENTER);

  fill(0);
  textSize(36);
  text("AGRO FORTE, FUTURO SUSTENTÁVEL", width / 2, 180);

  textSize(22);
  text("Colete sementes e água", width / 2, 260);
  text("Evite a poluição", width / 2, 300);

  fill(0, 180, 0);
  rect(width / 2 - 120, 380, 240, 70, 15);

  fill(255);
  textSize(30);
  text("JOGAR", width / 2, 425);
}

function mousePressed() {
  if (
    estado == "inicio" &&
    mouseX > width / 2 - 120 &&
    mouseX < width / 2 + 120 &&
    mouseY > 380 &&
    mouseY < 450
  ) {
    estado = "jogo";
  }
}

function moverJogador() {
  if (keyIsDown(LEFT_ARROW)) jogador.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) jogador.x += 5;
  if (keyIsDown(UP_ARROW)) jogador.y -= 5;
  if (keyIsDown(DOWN_ARROW)) jogador.y += 5;

  jogador.x = constrain(jogador.x, 20, width - 20);
  jogador.y = constrain(jogador.y, 20, height - 20);
}

function desenharJogador() {

  fill(255, 220, 180);
  ellipse(jogador.x, jogador.y - 20, 30);

  fill(0, 100, 255);
  rect(jogador.x - 15, jogador.y - 5, 30, 35, 5);
}

function mostrarHUD() {
  fill(0);
  textAlign(LEFT);
  textSize(22);

  text("Pontos: " + pontos, 20, 35);
  text("Sustentabilidade: " + sustentabilidade, 20, 65);
}

function atualizarSementes() {
  for (let s of sementes) {

    fill(50, 180, 50);
    ellipse(s.x, s.y, 20);

    if (dist(jogador.x, jogador.y, s.x, s.y) < 30) {
      pontos += 10;
      sustentabilidade += 2;

      s.x = random(width);
      s.y = random(100, 500);
    }
  }
}

function atualizarAguas() {
  for (let a of aguas) {

    fill(0, 150, 255);
    ellipse(a.x, a.y, 20);

    if (dist(jogador.x, jogador.y, a.x, a.y) < 30) {
      pontos += 5;
      sustentabilidade += 5;

      a.x = random(width);
      a.y = random(100, 500);
    }
  }
}

function atualizarPoluicoes() {
  for (let p of poluicoes) {

    fill(100);
    rect(p.x, p.y, 25, 25);

    if (dist(jogador.x, jogador.y, p.x, p.y) < 30) {
      sustentabilidade -= 15;

      p.x = random(width);
      p.y = random(100, 500);
    }
  }
}

function novoItem(tipo) {
  return {
    tipo: tipo,
    x: random(width),
    y: random(100, 500)
  };
}

function telaVitoria() {
  background(50, 180, 80);

  textAlign(CENTER);

  fill(255);
  textSize(45);
  text("PARABÉNS!", width / 2, 220);

  textSize(30);
  text("Você criou uma fazenda sustentável!", width / 2, 300);
}

function telaDerrota() {
  background(200, 60, 60);

  textAlign(CENTER);

  fill(255);
  textSize(45);
  text("FIM DE JOGO", width / 2, 220);

  textSize(28);
  text("A poluição venceu.", width / 2, 300);
}
