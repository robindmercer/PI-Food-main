import axios from "axios";
import { GET_FOODS, GET_FOOD_DETAIL, GET_TIPOS, FILTER,RESET_FOOD, GET_PLATOS,SET_LOADING } from './constants'

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

// Tipo de Platos Action (trae todos)
export function getPlatos() {
    console.log('Action ->getPlatos');
    return async function (dispatch) {
      const platos = await axios.get(`/platos`);
      return dispatch({
          type: GET_PLATOS, 
          payload: platos.data 
        });
    }
  }

// Loading advise
export function setLoading() {
    return {
      type: SET_LOADING,
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