import axios from 'axios'

export const GET_FOODS = 'GET_FOODS'
export const GET_FOOD = 'GET_FOOD'
export const GET_TIPOS = 'GET_TIPOS'
export const FILTER = 'FILTER'
export const SET_LOADING = 'SET_LOADING'

//! Sends Action to get all breeds
export function getFoods() {
  return function (dispatch) {
    return axios.get('/recipes/')
      .then((response) => response.data)
      .then((json) => {
        dispatch({ type: GET_FOODS, payload: json })
      })
  }
}

//! Sends Action to get food by query
export function getFood(name) {
  return function (dispatch) {
    return axios
      .get(`/recipes?name=${name}`)
      .then((response) => response.data)
      .then((json) => {
        dispatch({ type: GET_FOOD, payload: json })
      })
  }
}

//! Sends Action to get all tipos
export function getTipos() {
  return function (dispatch) {
    return axios
      .get(`/tipos`)
      .then((response) => response.data)
      .then((json) => {
        dispatch({ type: GET_TIPOS, payload: json })
      })
  }
}

export function setLoading() {
  return {
    type: SET_LOADING,
  }
}

//! Sends Action to set filter
export function filter(payload) {
  return {
    type: FILTER,
    payload,
  }
}

//! Sends Action to set sorting
export function sortFoods(order) {
  return {
    type: order,
  }
}

//! Sends Action to set order by weight
// export function orderByWeight(order) {
//   return {
//     type: order,
//   }
// }
