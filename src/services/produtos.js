import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_PRODUTOS = 'ProdutosCadastrados';


// CADASTRAR PRODUTO
export const cadastrarProduto = async (
    nome,
    descricao,
    categoria,
    quantidade,
    valor
) => {
    try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_PRODUTOS);

        const produtos = dadosSalvos
            ? JSON.parse(dadosSalvos)
            : [];

        const novoProduto = {
            id: Date.now().toString(),
            nome,
            descricao,
            categoria,
            quantidade,
            valor,
        };

        produtos.push(novoProduto);

        await AsyncStorage.setItem(
            CHAVE_PRODUTOS,
            JSON.stringify(produtos)
        );

        return novoProduto;

    } catch (error) {
        throw error;
    }
};


// LISTAR PRODUTOS
export const listarProdutos = async () => {
    try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_PRODUTOS);

        if (!dadosSalvos) {
            return [];
        }

        return JSON.parse(dadosSalvos);

    } catch (error) {
        throw error;
    }
};


// BUSCAR PRODUTO POR ID
export const buscarProdutoPorId = async (id) => {
    try {
        const produtos = await listarProdutos();

        const produtoEncontrado = produtos.find(
            produto => String(produto.id) === String(id)
        );

        return produtoEncontrado;

    } catch (error) {
        throw error;
    }
};


// ATUALIZAR PRODUTO
export const atualizarProduto = async (id, dadosAtualizados) => {
    try {
        const produtos = await listarProdutos();

        const indiceProduto = produtos.findIndex(
            produto => String(produto.id) === String(id)
        );

        if (indiceProduto === -1) {
            throw new Error('Produto não encontrado.');
        }

        produtos[indiceProduto] = {
            ...produtos[indiceProduto],
            ...dadosAtualizados,
        };

        await AsyncStorage.setItem(
            CHAVE_PRODUTOS,
            JSON.stringify(produtos)
        );

        return produtos[indiceProduto];

    } catch (error) {
        throw error;
    }
};


// DELETAR PRODUTO
export const deletarProduto = async (id) => {
    try {
        const produtos = await listarProdutos();

        const produtosAtualizados = produtos.filter(
            produto => String(produto.id) !== String(id)
        );

        if (produtosAtualizados.length === produtos.length) {
            throw new Error('Produto não encontrado.');
        }

        await AsyncStorage.setItem(
            CHAVE_PRODUTOS,
            JSON.stringify(produtosAtualizados)
        );

        return true;

    } catch (error) {
        throw error;
    }
};