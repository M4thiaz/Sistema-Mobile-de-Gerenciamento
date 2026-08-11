import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_USUARIOS = 'UsuariosCadastrados';

// Listar Usuários
export async function listarUsuarios() {
    try {
        const usuariosSalvos = await AsyncStorage.getItem(CHAVE_USUARIOS)

        if (!usuariosSalvos) {
            return [];
        }

        return JSON.parse(usuariosSalvos)
    } catch (error) {
        console.error('Erro ao buscar usuários: ', error);
        return [];
    }
}

// Atualizar Usuários
export async function atualizarUsuario(id, dadosAtualizados) {
    try {
        const usuariosSalvos = await AsyncStorage.getItem(
            'UsuariosCadastrados'
        );

        if (!usuariosSalvos) {
            throw new Error('Nenhum usuário cadastrado.');
        }

        const usuarios = JSON.parse(usuariosSalvos);

        const indiceUsuario = usuarios.findIndex(
            usuario => String(usuario.id) === String(id)
        );

        if (indiceUsuario === -1) {
            throw new Error('Usuário não encontrado.');
        }

        usuarios[indiceUsuario] = {...usuarios[indiceUsuario], ...dadosAtualizados,};

        await AsyncStorage.setItem(
            'UsuariosCadastrados',
            JSON.stringify(usuarios)
        );

        return usuarios[indiceUsuario];

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
}

// Deletar Usuários

export async function deletarUsuario(id) {
    try {
        const usuariosSalvos = await AsyncStorage.getItem('UsuariosCadastrados');

        if (!usuariosSalvos) {
            throw new Error('Nenhum usuário cadastrado.');
        }

        const usuarios = JSON.parse(usuariosSalvos);

        const usuariosAtualizados = usuarios.filter(
            usuario => String(usuario.id) !== String(id)
        );

        if (usuariosAtualizados.length === usuarios.length) {
            throw new Error('Usuário não encontrado.');
        }

        await AsyncStorage.setItem('UsuariosCadastrados', JSON.stringify(usuariosAtualizados));

        return true;

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
}



