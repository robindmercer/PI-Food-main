import axios from "axios";
import { GET_FOODS, GET_FOOD_DETAIL, GET_TIPOS, FILTER,RESET_FOOD, SET_LOADING,SET_SEARCH,GET_LANG, SET_LANG  } from './constants'

// comunico con el Back 
// Busco recetas
export function getFoods() {
    return async function (dispatch) {
        var recetas = await axios.get('/recipes');
        return dispatch({
            type: GET_FOODS,
            payload: recetas.data
        })
    }
}

// Busco una recetas por id
export function getFood(id) {
    return async function (dispatch) {
        var receta = await axios.get(`/recipes/detail/${id}`);
        return dispatch({
            type: GET_FOOD_DETAIL,
            payload: receta.data
        })
    }
}
// Tipo de Dieta Action (trae todos)
export function getTipos() {
    return async function (dispatch) {
      const tipos = await axios.get(`/tipos`);
        return dispatch({
             type: GET_TIPOS, 
             payload: tipos.data 
        });
    }
  }
// Tipo de Dieta Action (trae todos)
export function getLang() {
    return async function (dispatch) {
      const idioma = await axios.get(`/idiomas`);
        return dispatch({
             type: GET_LANG, 
             payload: idioma.data 
        });
    }
  }

export function setLang(lang){
    return {
        type: SET_LANG,
        payload: lang
    }
}
    

// Loading advise
export function setLoading() {
    return {
      type: SET_LOADING,
    }
  }

// Turn Off search bar 
export function setOffSearch() {
    return {
      type: SET_SEARCH,
    }
}

// Filter Action
export function filter(payload) {
    return {
        type: FILTER,
        payload,
    }
}

// Sort Action
export function sortFoods(order) {
    return {
        type: order,
    }
}


export function resetFood() {
    return {
        type: RESET_FOOD
    }
}

export function filterLang(array, page, lang){
     //console.log('filterLang array: ', array);
     //console.log('filterLang lang: ', lang);
     //console.log('filterLang page: ', page);
    let idioma = []
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].lang === lang && array[i].page === page ) idioma.push(array[i].texto);
      }
      //console.log('filterLang idioma: ', idioma);
    }
    return idioma;
}