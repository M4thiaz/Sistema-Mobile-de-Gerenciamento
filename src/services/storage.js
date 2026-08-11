import AsyncStorage from '@react-native-async-storage/async-storage';

export const cadastrarUsuario = async (usuario, email, senha, estado, cargo) => {
    try {

        const checkLista = await AsyncStorage.getItem('UsuariosCadastrados');

        const validacaoLista = checkLista ? JSON.parse(checkLista) : [];

        const cadastroInvalido = validacaoLista.find(i => i.usuario === usuario || i.email === email)

        if (cadastroInvalido) {
            if (cadastroInvalido.email === email) throw new Error('Email já está sendo utilizado.')
            if (cadastroInvalido.usuario === usuario) throw new Error('Nome já está sendo utilizado.')
        }

        const novoCadastro = {id: Date.now().toString(), usuario, email, senha, estado, cargo }
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

