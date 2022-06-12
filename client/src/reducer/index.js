import { GET_FOODS, GET_FOOD_DETAIL, GET_TIPOS,GET_PLATOS } from '../actions/constants' 
import { FILTER, SET_LOADING, GET_FOOD, ORDER_AZ, ORDER_ZA,RESET_FOOD
 } from '../actions/constants'

const initialState = {
  allFoods: [],
  searchedFood: [],
  foodDetail: {},
  tipo: [],
  plato:[],
  filteredFoods: [],
  loading: false,
  showFilter: false,
}

// Reducer to get foods ordered by alphabet
const rootReducer = (state = initialState, action) => {

  if (action.type === GET_FOODS) {
    return {
      ...state,
      loading: true,
      allFoods: action.payload.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
      ),
          // eslint-disable-next-line
      loading: false,
    }
  }

  // Reducer to set loading state
  if (action.type === SET_LOADING) {
    return {
      ...state,
      loading: true,
    }
  }

  // Reducer to get food details 
  if (action.type === GET_FOOD_DETAIL) {
    return {
      ...state,
      loading: true,
      foodDetail: action.payload,
      // eslint-disable-next-line
      loading: false,
    }
  }

  // Reducer to get foods ordered by alphabet
  if (action.type === GET_FOOD) {
    return {
      ...state,
      loading: true,
      searchedFood: action.payload,
      allFoods: action.payload,
      filteredFoods: action.payload,
      // eslint-disable-next-line      
      loading: false,
    }
  }

  // Reducer to get tipo de dietas
  if (action.type === GET_TIPOS) {
    return {
      ...state,
      loading: true,
      tipo: action.payload,
       // eslint-disable-next-line     
      loading: false,
    }
  }

  // Reducer to get tipo de Platos
  if (action.type === GET_PLATOS) {
    return {
      ...state,
      loading: true,
      plato: action.payload,
       // eslint-disable-next-line     
      loading: false,
    }
  }

  // Reducer to get filtered foods
  if (action.type === FILTER) {
    return {
      ...state,
      loading: true,
      filteredFoods: action.payload,
       // eslint-disable-next-line     
      loading: false,
    }
  }
  if (action.type ===  RESET_FOOD
) {
    return {
      ...state,
      foodDetail: null
    }
  }

  // Reducer to get foods ordered by alphabet from A-Z
  if (action.type === ORDER_AZ) {
    return {
      ...state,
      loading: true,
      allFoods: state.allFoods
        .filter((b) => b.title !== null)
        .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)),
      searchedFood: state.searchedFood
        .filter((b) => b.title !== null)
        .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)),
      filteredFoods: state.filteredFoods
        .filter((b) => b.title !== null)
        .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)),
       // eslint-disable-next-line     
      loading: false,
    }
  }

  // Reducer to get foods ordered by alphabet from Z-A
  if (action.type === ORDER_ZA) {
    return {
      ...state,
      loading: true,
      allFoods: state.allFoods
        .filter((b) => b.title !== null)
        .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1)),
      searchedFood: state.searchedFood
        .filter((b) => b.title !== null)
        .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1)),
      filteredFoods: state.filteredFoods
        .filter((b) => b.title !== null)
        .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1)),
        // eslint-disable-next-line    
      loading: false,
    }
  }

  return state
}

export default rootReducer
