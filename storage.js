import AsyncStorage from '@react-native-async-storage/async-storage';
export async function saveUser(user) {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.log("Erro ao salvar usuário:", error);
  }
}
export async function getUser() {
  try {
    const data = await AsyncStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Erro ao buscar usuário:", error);
    return null;
  }
}
export async function removeUser() {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.log("Erro ao remover usuário:", error);
  }
}
