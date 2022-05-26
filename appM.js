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
    
    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
          return true
    }
}

function cadastrarMercadoria() {
    
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let categoria = document.getElementById('categoria')
    let descricao = document.getElementById('descricao')
    let quantidade = document.getElementById('quantidade')
    let valor = document.getElementById('valor')

    let mercadoria = new Mercadorias(
        ano.value,
        mes.value,
        dia.value,
        categoria.value,
        descricao.value,
        parseInt(quantidade.value),
        parseInt(valor.value)
    )

   /* let totalValor = new Mercadorias(
        ano.undefined,
        mes.undefined,
        dia.undefined,
        categoria.undefined,
        descricao.undefined,
        parseInt(quantidade.value),
        parseInt(valor.value)
    ) */

    
    console.log(totalValor)

    

    
    
    
}