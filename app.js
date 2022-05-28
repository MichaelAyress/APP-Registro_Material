class Mercadorias {
        constructor(ano, mes, dia, categoria, descricao, quantidade, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.categoria = categoria
        this.descricao = descricao
        this.quantidade = quantidade
        this.valor = valor
    } 
    // 3 = criamos a function para validar os Dados no formulario 
    validarDados() {
        // adicionar this que é um objeto literal utilizando this[i] seria como acessar o objeto literal utilizando this.nomeDoAtributo
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }

        return true
    }
}
// 2 = Segundo  banco de dados onde vamos adicionar valores e recuperar seus valores dentro do LocalStorage
class Bd {
    constructor() {
        let id = localStorage.getItem('id') // 3 = Procura o dado 'id' dentro de local storage, porem não existe este valor em local storage então resultado disso é null

        if(id === null) { // 4 = se id for identico a null adicionamos a chave 'id" dentro do local storage com valor de 0
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id'); // 4 = GetItem serve para recuperar um dado dentro do localStorage no caso o id que agora passa a ser o 0 dentro da variavel proximoId
        return parseInt(proximoId) + 1; // returnando o valor da variavel + 1
    }

    gravar(d) {

        let id = this.getProximoId(); // 4 = sempre que gravar for executado vamos pegar o proximo id

        localStorage.setItem(id, JSON.stringify(d)); // 1 = JSON.Stringy converte Objeto para Json, setItem erve para inserir um dado dentro do local storage

        localStorage.setItem('id', id); // 5 =  após executar a function gravar o 'id substitui o valor para a variavel id 
    }
     
    // 6 - Recuperar todos os registros dentro do LocalStorage pra exibir em um Array na página consulta após recarregala
    recuperarTodosRegistros() {
        //array de mercadorias
        let mercadorias = Array()

        let id = localStorage.getItem('id');

        //Recupera todas mercadorias cadastrada em LocalStorage
        for(let i = 1; i <= id; i++) {

            // recuperar as mercadorias
            let mercadoria = JSON.parse(localStorage.getItem(i)); // parse recupera os valores em JSON  em array

            //existe a possibilidade de haver índices que foram pulados/removidos
            //neste caso nós vamos pular esses índices
            if(mercadoria === null) {
                continue
            }

            mercadoria.i // Adiciona um elemento chamado Id dentro do array com o valor de i
            mercadorias.push(mercadoria) // cada interação adicionamos mercadoria dentro do Array mercadorias

        }

        return mercadorias
    }


}
//  adicina a class Bd na variavel bd
let bd = new Bd()

// 1 = Primeiro criamos a function do evento do botão para cadastrar as despesas de acordo com o valor dos input
function cadastrarMercadoria() {
    
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let categoria = document.getElementById('categoria')
    let descricao = document.getElementById('descricao')
    let quantidade = document.getElementById('quantidade')
    let valor = document.getElementById('valor')
    
    // Criamos a variavel mercadoria contendo os atributos do Objeto Mercadorias 
    let mercadoria = new Mercadorias (ano.value, mes.value, dia.value, categoria.value, descricao.value, quantidade.value, valor.value)
        
    
    //4 = Vamos verificar se á valor no formulario com a function validarDados .. e Executar o modal de acordo com o resultado
   if(mercadoria.validarDados()) {
       //Ao executar o evento de onlcik capturamos a função gravar dentro da classe Bd
        bd.gravar(mercadoria);
        // Texto de sucesso
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Mercadoria foi cadastrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'

        $('#modalRegistraMercadoria').modal('show'); 

        // Limpar formulario
        ano.value = ''
        mes.value = ''
        dia.value = ''
        categoria.value = ''
        descricao.value = ''
        quantidade.value = ''
        valor.value = ''

   } else {
         // Texto de Erro
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        $('#modalRegistraMercadoria').modal('show');
   }

}

//5 =  Página Consulta
function carregaListaMercadorias() {
    // 1 = Criamos  Array chamado mercadorias
    let mercadorias = Array();
    // 2 = Recuperamos os registros do LocalStorage e adicionamos no Array mercadorias
    mercadorias = bd.recuperarTodosRegistros()

    //3 = selecionando o elemento tbody da tabela
    var listaMercadorias = document.getElementById('listaMercadorias')
    var ValorTotalMercadorias = document.getElementById('ValorTotalMercadorias')

    // map recupera o valor dentro de um objeto da Array onde valores agora passa a receber apenas o valor do objeto Valor em formato String
    let valores = mercadorias.map(function(e) { return e.valor; });
    let qtd = mercadorias.map(function(e) { return e.quantidade; });
    
    let valorTotal = 0
    //Percorre por cada indice do Array valores armazenando seus valores na variavel i até que i seja menor que o comprimento do array, em seguida soma o valor com a variavel valorTotal .
    for(let i = 0; i < valores.length; i++) {
        valorTotal += Number(valores[i])
    }

    console.log(valorTotal)

    // 4 = percorre pelo Array mercadorias, listando cada mercadoria de forma dinâmica
    // metodos forEach é usado para percorrer o arrays, mas usa uma função de modo diferente do laço for "tradicional". Ele passa a função de callback para cada elemento do array juntamente aos seguintes parâmetros valor atual (obrigatório) - O valor do elemento atual do array
    mercadorias.forEach(function(m) {

        //criando a linha (tr)
        let linha = listaMercadorias.insertRow()

        //Criar as colunas (td)
        linha.insertCell(0).innerHTML = `${m.dia}/${m.mes}/${m.ano}`

        // Ajustar a categoria 
        switch(parseInt(m.categoria)){
            case 1: m.categoria = 'Escolas'
               break
            case 2: m.categoria = 'Informática'
               break
            case 3: m.categoria = 'Móveis'
               break
            case 4: m.categoria = 'Eletro domesticos'
               break
            case 5: m.categoria = 'Celular'
               break
            case 6: m.categoria = 'Roupas'
               break
        }
 
        linha.insertCell(1).innerHTML = m.categoria
        linha.insertCell(2).innerHTML = m.descricao
        // variavel valor recebe em formato de número o valor dentro do objeto valor
        let valor = Number(m.valor)
        // converte o valor para exibir como moeda br em formato string
        let valorBr = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});


        // Multiplicando Quantidade com valores e convertendo pra moeda BR
        let valorQuantidade =  Number(m.quantidade) * Number(m.valor);
        let ValorQtdBr = valorQuantidade.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        

        linha.insertCell(3).innerHTML = m.quantidade + ' unidades'
        linha.insertCell(4).innerHTML = valorBr
        linha.insertCell(5).innerHTML = ValorQtdBr

    })
    //criando a linha (tr)
    let linhaV = ValorTotalMercadorias.insertRow()
    //Criar as colunas (td)
    linhaV.insertCell(0).innerHTML = 'oi'

    
    

}

