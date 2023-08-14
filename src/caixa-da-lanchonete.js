class CaixaDaLanchonete {
    constructor() {
        this.menu = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };
    }

    // Função para calcular o valor total da compra
    calcularValorDaCompra(formaDePagamento, itens) {
        const itensPrincipais = []; // Array para armazenar os itens principais
        let valorTotal = 0; // Valor total inicializado em zero

        for (const itemQuantidade of itens) {
            const [item, quantidade] = itemQuantidade.split(',');
            
            if (!this.menu[item]) {
                return "Item inválido!";
            } else if (quantidade <= 0) {
                return "Quantidade inválida!";
            }
            if (item === `chantily`) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (item.includes('extra')) {
                const principal = item.split(' com ')[1].split(' ')[0];
                if (!itensPrincipais.includes(principal)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            } else {
                itensPrincipais.push(item); // Adicionar o item principal
            }

            valorTotal += this.menu[item] * quantidade;
        }

        if (valorTotal === 0) {
            return "Não há itens no carrinho de compra!";
        }

        const metodosValidos = ['dinheiro', 'credito', 'debito'];
        if (!metodosValidos.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        // Calcular desconto/acréscimo de acordo com a forma de pagamento
        const descontoAcrescimo = {
            dinheiro: 0.95,
            credito: 1.03,
            debito: 1,
        }[formaDePagamento];

        const valorFinal = (valorTotal * descontoAcrescimo).toFixed(2).replace('.', ',');

        return `R$ ${valorFinal}`; // Retornar o valor formatado
    }
}

export { CaixaDaLanchonete };