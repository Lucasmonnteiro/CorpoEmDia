import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Salva o usuário no AsyncStorage
 */
export async function saveUser(user) {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.log("Erro ao salvar usuário:", error);
  }
}

/**
 * Busca o usuário salvo
 */
export async function getUser() {
  try {
    const data = await AsyncStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Erro ao buscar usuário:", error);
    return null;
  }
}

/**
 * Remove o usuário (logout)
 */
export async function removeUser() {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.log("Erro ao remover usuário:", error);
  }
}
