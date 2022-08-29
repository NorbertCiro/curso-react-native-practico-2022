//Aca estamos importando nuestro paquete de async-Storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//Importaremos las funciones que usaremos
import { includes, pull } from "lodash"; //Esta añadira pokemosnes a la lista de favoritos

import { FAVORITE_STORAGE } from "../utils/constants"; //Esta funcion nos traera los pokemones de la lista de favorios

//Funcion que añade pokemosnes a favoritos

export async function getPokemonsFavoriteApi() {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    //esta parte me permite que la funcion devuelva en un array ya sea vacio o +1
    return JSON.parse(response || "[]"); //devuelve el array con los id de los pokemons
    // return response ? JSON.parse(response) : [];
  } catch (error) {
    throw error;
  }
}

export async function addPokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonsFavoriteApi();
    favorites.push(id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
  } catch (error) {
    throw error;
  }
}

export async function isPokemonFavoriteApi(id) {
  try {
    const response = await getPokemonsFavoriteApi();
    return includes(response, id);
  } catch (error) {
    throw error;
  }
}

export async function removePokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonsFavoriteApi();
    const newFavorites = pull(favorites, id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
  } catch (error) {
    throw error;
  }
}
