console.log('Flappy Bird');


const sprites = new Image(); //Criando imagem no JS
sprites.src = 'sprites.png'; //Local da imagem

const canvas = document.querySelector('canvas'); 
const contexto = canvas.getContext('2d');

//mensagem get ready
const mensagemGetReady = {
    sx: 134,
    sy: 0,
    w: 174,
    h: 152,
    x: (canvas.width /2) - 174 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sx, mensagemGetReady.sy,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h,
        );
    }
};

//Plano de Fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    desenha() {

        contexto.fillStyle = '#70c5ce'; // Completar o fundo do canvas com a cor
        contexto.fillRect(0, 0, canvas.width, canvas.height); //Desenhar no código: 0, 0 = começa no ponto X e Y do zero e pinta até o width e height do canvas


        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );
        
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );
        
    }
};

//Chao
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,


        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        );    
    }
}


//Bird
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,

    velocidade: 0,
    gravidade: 0.25,

    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    desenha() {
        contexto.drawImage(
            sprites, // Image
            flappyBird.spriteX, flappyBird.spriteY, // Distância da imagem da lateral e do topo
            flappyBird.largura, flappyBird.altura, // Tamanho da imagem 
            flappyBird.x, flappyBird.y, // Distância do tamanho da imagem escolhida no canvas (onde a imagem irá aparecer)
            flappyBird.largura, flappyBird.altura // Tamanho da imgem dentro do canvas
        
        );
    }
}


//Telas
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
};

const telas = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha();
            
        },

        click() {
            mudaParaTela(telas.JOGO);
        },

        atualiza() {

        },
    }
}

telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualiza() {
        flappyBird.atualiza();
    }
}


function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop); // Otimização no javascript em performance de animações, desenha quadros na tela (FPS) INFINITO
}


window.addEventListener('click', () => {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
})

mudaParaTela(telas.INICIO);
loop();