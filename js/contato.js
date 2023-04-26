/*  Selecionando elementos a serem manipulados */

const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoTelefone = formulario.querySelector("#telefone");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const mensagem = formulario.querySelector("#status");
const botaoLocalizar = formulario.querySelector("#localizar-cep");

/* Ativação das máscaras com jQuery Mask */
$(campoCep).mask("00000-000");
$(campoTelefone).mask("(00) 0000-0000");







/* Monitorar o evento de acionamento do botão localizar cep */

botaoLocalizar.addEventListener("click", function(event){
    event.preventDefault();

    // Pegar o cep digitado
    let cep = campoCep.value;
    
    /* API (Web Service) ViaCEP */
    // www.viacep.com.br

    /* Etapa 1 : preparar uma URL contendo o cep digitado e o caminho da API (ViaCEP) */
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    console.log(url);

    /* Etapa 2 : acesse e inicie uma comunicação/requisição com o servidor da URL indicada */
    fetch(url)

    /* Etapa 3 : e então, recupere a resposta do servidor no formato de objeto (JSON). Este objeto contem todas as informações do endereço referente ao CEP informado.*/
    .then(function(resposta){
        return resposta.json()
    })

    /* Etapa 4 : e então, extraia os dados da resposta e mostre na tela */
    .then( dados => {
        console.log(dados);

        if("erro" in dados){
            // apresentamos a mensagem abaixo
            mensagem.innerHTML = "CEP não encontrado!";
            mensagem.style.color = "red";
            campoEndereco.focus();
        }else {
            // senão, o cep existe então mostramos
            mensagem.innerHTML = "CEP encontrado!";
            mensagem.style.color = "blue";
            
            campoEndereco.value = dados.logradouro;
            campoBairro.value = dados.bairro;
            campoCidade.value = dados.localidade;
            campoEstado.value = dados.uf;


        }
    })

});

