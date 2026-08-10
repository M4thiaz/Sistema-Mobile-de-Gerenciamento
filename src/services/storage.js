import AsyncStorage from '@react-native-async-storage/async-storage';

// USUÁRIOS CADASTRO E VALIDAÇÃO
export const cadastrarUsuario = async (usuario, email, senha) => {
    try {

        const checkLista = await AsyncStorage.getItem('UsuariosCadastrados');

        const validacaoLista = checkLista ? JSON.parse(checkLista) : [];

        const cadastroInvalido = validacaoLista.find(i => i.usuario === usuario || i.email === email)

        if (cadastroInvalido) {
            if (cadastroInvalido.email === email) throw new Error('Email já está sendo utilizado.')
            if (cadastroInvalido.usuario === usuario) throw new Error('Nome já está sendo utilizado.')
        }

        const novoCadastro = { usuario, email, senha }
        validacaoLista.push(novoCadastro);
        await AsyncStorage.setItem('UsuariosCadastrados', JSON.stringify(validacaoLista));

        return novoCadastro

    } catch (error) {
        throw error;
    }
}

export const verificarLogin = async (emailInput, senhaInput) => {
    try {
        const dadosSalvos = await AsyncStorage.getItem('UsuariosCadastrados');

        if (dadosSalvos !== null) {
            const listaUsuario = JSON.parse(dadosSalvos);
            const loginValido = listaUsuario.find(i => i.email === emailInput && i.senha === senhaInput);

            if (loginValido) {
                return loginValido;
            } else {
                throw new Error('Usuário ou senha incorretos.');
            }

        } else {
            throw new Error('Erro', 'Nenhum usuário cadastrado neste dispositivo.');
        }
    } catch (error) {
        throw error;
    }
};

//PRODUTOS CRUD


//USUARIOS CRUD
