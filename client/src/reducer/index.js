import { GET_FOODS, GET_FOOD_DETAIL, GET_TIPOS, GET_FOOD,FILTER } from '../actions/constants' 
import { SET_LOADING,ORDER_AZ, ORDER_ZA,RESET_FOOD,ORDER_AP,ORDER_DP,SET_SEARCH
         } from '../actions/constants'

const initialState = {
  allFoods: [],
  searchedFood: [],
  foodDetail: {},
  tipo: [],
  filteredFoods: [],
  loading: false,
  showShearch: true,
}

// Reducer to get foods ordered by alphabet
const rootReducer = (state = initialState, action) => {

  if (action.type === GET_FOODS) {
    return {
      ...state,
      loading: true,
      showShearch: true,
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

  // Turn Off Search Bar
  if (action.type === SET_SEARCH) {
    return {
      ...state,
      showShearch: false,
    }
  }

  // Reducer to get food details 
  if (action.type === GET_FOOD_DETAIL) {
    return {
      ...state,
      loading: true,
      showShearch: false,    
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
      showShearch: true,
      foodDetail: null
    }
  }

  // Foods ordered by alphabet from A-Z
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

  // Foods ordered by alphabet from Z-A  
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


  // Foods ordered by healthScore
  if (action.type === ORDER_AP) {
    return {
      ...state,
      loading: true,
      allFoods: state.allFoods
        .filter((b) => b.healthScore !== null)
        .sort((a, b) => (a.healthScore > b.healthScore ? 1 : -1)),
      searchedFood: state.searchedFood
        .filter((b) => b.healthScore !== null)
        .sort((a, b) => (a.healthScore > b.healthScore ? 1 : -1)),
      filteredFoods: state.filteredFoods
        .filter((b) => b.healthScore !== null)
        .sort((a, b) => (a.healthScore > b.healthScore ? 1 : -1)),
       // eslint-disable-next-line     
      loading: false,
    }
  }

  // Foods ordered by healthScore
  if (action.type === ORDER_DP) {
    return {
      ...state,
      loading: true,
      allFoods: state.allFoods
        .filter((b) => b.healthScore !== null)
        .sort((a, b) => (a.healthScore < b.healthScore ? 1 : -1)),
      searchedFood: state.searchedFood
        .filter((b) => b.healthScore !== null)
        .sort((a, b) => (a.healthScore < b.healthScore ? 1 : -1)),
      filteredFoods: state.filteredFoods
        .filter((b) => b.healthScore !== null)
        .sort((a, b) => (a.healthScore < b.healthScore ? 1 : -1)),
        // eslint-disable-next-line    
      loading: false,
    }
  }

  return state
}

export default rootReducer
