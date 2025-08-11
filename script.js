let perguntaAtual = 1;
let totalAcertos = 0;

const gabarito = {
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'B',
  5: 'D',
  6: 'B',
  7: 'B',
  8: 'A',
  9: 'B',
  10: 'C'
};

let tempoRestante = 40;
let intervaloCronometro = null;

function iniciarCronometro() {
  const cronometro = document.getElementById('cronometro');
  tempoRestante = 40;
  cronometro.textContent = tempoRestante;
  cronometro.style.display = 'block';

  if (intervaloCronometro) clearInterval(intervaloCronometro);

  intervaloCronometro = setInterval(() => {
    tempoRestante--;
    cronometro.textContent = tempoRestante;
    if (tempoRestante <= 0) {
      clearInterval(intervaloCronometro);
      pularPergunta();
    }
  }, 1000);
}

function pararCronometro() {
  const cronometro = document.getElementById('cronometro');
  cronometro.style.display = 'none';
  if (intervaloCronometro) clearInterval(intervaloCronometro);
}

function pularPergunta() {
  perguntaAtual++;
  if (perguntaAtual <= 10) {
    mudarTela('pergunta' + perguntaAtual);
    iniciarCronometro();
  } else {
    mostrarResultado();
  }
}

function mudarTela(id) {
  console.log('Mudando para:', id);
  const telas = document.querySelectorAll('.tela');
  telas.forEach(tela => tela.classList.remove('ativa'));

  const novaTela = document.getElementById(id);
  if (novaTela) {
    novaTela.classList.add('ativa');
    // Cronômetro fase 1
    if (/^pergunta[1-9]$|^pergunta10$/.test(id)) {
      iniciarCronometro();
    } 
    // Cronômetro fase 2
    else if (/^fase2pergunta[1-9]$|^fase2pergunta10$/.test(id)) {
      iniciarCronometroFase2();
    } else {
      pararCronometro();
      pararCronometroFase2();
    }
  } else {
    console.error(`Tela com ID "${id}" não encontrada.`);
  }
}

function responder(opcao) {
  pararCronometro();
  if (opcao === gabarito[perguntaAtual]) {
    totalAcertos++;
  }
  perguntaAtual++;
  if (perguntaAtual <= 10) {
    mudarTela('pergunta' + perguntaAtual);
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  pararCronometro();
  const textoResultado = document.getElementById('resultado-texto');
  textoResultado.textContent = `Você acertou ${totalAcertos} de 10 perguntas!`;

  document.querySelectorAll('.tela').forEach(tela => {
    tela.classList.remove('ativa');
  });

  const telaResultado = document.getElementById('tela-resultado');
  telaResultado.classList.add('ativa');

  const btnAvancar = document.getElementById('btn-avancar');
  const btnTentar = document.getElementById('btn-tentar');

  if (totalAcertos >= 5) {
    btnAvancar.style.display = 'inline-block';
    btnTentar.style.display = 'none';
  } else {
    btnAvancar.style.display = 'none';
    btnTentar.style.display = 'inline-block';
  }
}

function tentarNovamente() {
  perguntaAtual = 1;
  totalAcertos = 0;
  mudarTela('pergunta1');
}

// --- Lógica da fase 2 ---

let fase2PerguntaAtual = 1;
let fase2Acertos = 0;
let tempoRestante2 = 40;
let intervaloCronometro2 = null;

const gabaritoFase2 = {
  1: 'C',
  2: 'D',
  3: 'A',
  4: 'B',
  5: 'D',
  6: 'C',
  7: 'B',
  8: 'C',
  9: 'B',
  10: 'C'
};

function iniciarCronometroFase2() {
  const cronometro = document.getElementById('cronometro');
  tempoRestante2 = 40;
  cronometro.textContent = tempoRestante2;
  cronometro.style.display = 'block';

  if (intervaloCronometro2) clearInterval(intervaloCronometro2);

  intervaloCronometro2 = setInterval(() => {
    tempoRestante2--;
    cronometro.textContent = tempoRestante2;
    if (tempoRestante2 <= 0) {
      clearInterval(intervaloCronometro2);
      pularPerguntaFase2();
    }
  }, 1000);
}

function pararCronometroFase2() {
  const cronometro = document.getElementById('cronometro');
  cronometro.style.display = 'none';
  if (intervaloCronometro2) clearInterval(intervaloCronometro2);
}

function pularPerguntaFase2() {
  fase2PerguntaAtual++;
  if (fase2PerguntaAtual <= 10) {
    mudarTela('fase2pergunta' + fase2PerguntaAtual);
    iniciarCronometroFase2();
  } else {
    mostrarResultadoFase2();
  }
}

function responderFase2(opcao) {
  pararCronometroFase2();
  if (opcao === gabaritoFase2[fase2PerguntaAtual]) {
    fase2Acertos++;
  }
  fase2PerguntaAtual++;
  if (fase2PerguntaAtual <= 10) {
    mudarTela('fase2pergunta' + fase2PerguntaAtual);
  } else {
    mostrarResultadoFase2();
  }
}

function mostrarResultadoFase2() {
  pararCronometroFase2();
  const textoResultado2 = document.getElementById('resultado-texto-fase2');
  textoResultado2.textContent = `Você acertou ${fase2Acertos} de 10 perguntas!`;

  document.querySelectorAll('.tela').forEach(tela => {
    tela.classList.remove('ativa');
  });

  const telaResultado2 = document.getElementById('tela-resultado-fase2');
  telaResultado2.classList.add('ativa');

  const btnTentar2 = document.getElementById('btn-tentar-fase2');

  if (fase2Acertos >= 5) {
    btnTentar2.style.display = 'none';
  } else {
    btnTentar2.style.display = 'inline-block';
  }
}

function tentarNovamenteFase2() {
  fase2PerguntaAtual = 1;
  fase2Acertos = 0;
  mudarTela('fase2pergunta1');
}

function avancarFase2() {
  fase2PerguntaAtual = 1;
  fase2Acertos = 0;
  mudarTela('tela-faseDois');
}
