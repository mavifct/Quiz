


const botaoIniciar = document.getElementById("botao-iniciar");
const telaInicio = document.getElementById("tela-inicio");
const telaPergunta = document.getElementById("tela-pergunta");
const resultado = document.getElementById("resultado");
const alternativas = document.querySelectorAll(".alternativa");

const telaBloqueio = document.getElementById("tela-bloqueio");
const btnVoltarInicio = document.getElementById("btn-voltar-inicio");

const telaFase2 = document.getElementById("tela-fase2");
const btnIniciarFase2 = document.getElementById("btn-iniciar-fase2");

const telaFase3 = document.getElementById("tela-fase3");
const btnIniciarFase3 = document.getElementById("btn-iniciar-fase3");

const telaFinal = document.getElementById("tela-final");
const btnVoltarInicioFinal = document.getElementById("btn-voltar-inicio-final");

let fase = 1;
let perguntaAtual = 0;
let erros = 0;

// Fase 1
const respostasFase1 = [1, 2, 3, 1, 3, 1, 1, 0, 1, 2];
const imagensFase1 = [
  "pergunta1.jpeg", "pergunta2.jpeg", "pergunta3.jpeg", "pergunta4.jpeg", "pergunta5.jpeg",
  "pergunta6.jpeg", "pergunta7.jpeg", "pergunta8.jpeg", "pergunta9.jpeg", "pergunta10.jpeg"
];

// Fase 2
const respostasFase2 = [2, 3, 0, 1, 3, 2, 1, 2, 1, 2];
const imagensFase2 = [
  "fase2pergunta1.jpeg", "fase2pergunta2.jpeg", "fase2pergunta3.jpeg", "fase2pergunta4.jpeg", "fase2pergunta5.jpeg",
  "fase2pergunta6.jpeg", "fase2pergunta7.jpeg", "fase2pergunta8.jpeg", "fase2pergunta9.jpeg", "fase2pergunta10.jpeg"
];

// Fase 3
const respostasFase3 = [0, 2, 0, 1, 3, 2, 1, 2, 0, 2];
const imagensFase3 = [
  "fase3pergunta1.jpeg", "fase3pergunta2.jpeg", "fase3pergunta3.jpeg", "fase3pergunta4.jpeg", "fase3pergunta5.jpeg",
  "fase3pergunta6.jpeg", "fase3pergunta7.jpeg", "fase3pergunta8.jpeg", "fase3pergunta9.jpeg", "fase3pergunta10.jpeg"
];

// Iniciar jogo na fase 1
botaoIniciar.onclick = () => {
  iniciarFase(1);
};

// Voltar para o início da tela bloqueio (fase 1 e 2)
btnVoltarInicio.onclick = () => {
  telaBloqueio.style.display = "none";
  telaInicio.style.display = "block";
  fase = 1;
  erros = 0;
  perguntaAtual = 0;
};

// Voltar para o início da tela final (fase 3)
btnVoltarInicioFinal.onclick = () => {
  telaFinal.style.display = "none";
  telaInicio.style.display = "block";
  fase = 1;
  erros = 0;
  perguntaAtual = 0;
};

// Iniciar fase 2
btnIniciarFase2.onclick = () => {
  iniciarFase(2);
};

// Iniciar fase 3
btnIniciarFase3.onclick = () => {
  iniciarFase(3);
};

// Clique nas alternativas
alternativas.forEach((botao, indice) => {
  botao.onclick = () => verificarResposta(indice);
});

// Função para iniciar qualquer fase
function iniciarFase(num) {
  fase = num;
  erros = 0;
  perguntaAtual = 0;

  telaInicio.style.display = "none";
  telaPergunta.style.display = "block";
  telaBloqueio.style.display = "none";
  telaFase2.style.display = "none";
  telaFase3.style.display = "none";
  telaFinal.style.display = "none";

  mostrarPergunta();
}

// Mostra a pergunta atual da fase atual
function mostrarPergunta() {
  telaPergunta.style.display = "block";

  const imagens = fase === 1 ? imagensFase1 :
                  fase === 2 ? imagensFase2 : imagensFase3;

  telaPergunta.style.backgroundImage = `url('IMG/${imagens[perguntaAtual]}')`;

  resultado.style.display = "none";

  alternativas.forEach(btn => {
    btn.style.display = "block";
    btn.disabled = false;
  });
}

// Verifica a resposta e avança ou bloqueia
function verificarResposta(indiceEscolhido) {
  const respostas = fase === 1 ? respostasFase1 :
                    fase === 2 ? respostasFase2 : respostasFase3;

  const respostaCerta = respostas[perguntaAtual];

  if (indiceEscolhido === respostaCerta) {
    resultado.textContent = "Correto!";
    resultado.style.color = "#00FF00";
  } else {
    resultado.textContent = "Errado!";
    resultado.style.color = "#FF0000";
    erros++;
  }

  resultado.style.display = "block";

  setTimeout(() => {
    if (erros >= 3) {
      telaPergunta.style.display = "none";
      telaBloqueio.style.display = "block";
      return;
    }

    perguntaAtual++;

    const totalPerguntas = respostas.length;

    if (perguntaAtual < totalPerguntas) {
      mostrarPergunta();
    } else {
      if (fase === 1) {
        telaPergunta.style.display = "none";
        telaFase2.style.display = "block";
      } else if (fase === 2) {
        telaPergunta.style.display = "none";
        telaFase3.style.display = "block";
      } else {
        // Fim da fase 3, mostrar tela final
        telaPergunta.style.display = "none";
        telaFinal.style.display = "block";
      }
    }
  }, 1000);
}