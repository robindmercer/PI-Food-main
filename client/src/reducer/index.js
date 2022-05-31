const initialState = {
  allFoods: [],
  searchedFood: [],
  foodDetail: {},
  tipo: [],
  filteredFoods: [],
  loading: false,
}

//! Reducer to get foods ordered by alphabet
const rootReducer = (state = initialState, action) => {
  if (action.type === 'GET_FOODS') {
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

  //! Reducer to set loading state
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: true,
    }
  }

  //! Reducer to get food details from DB
  if (action.type === 'GET_FOOD_DETAIL') {
    return {
      ...state,
      loading: true,
      foodDetail: action.payload,
      // eslint-disable-next-line
      loading: false,
    }
  }

  //! Reducer to get foods ordered by alphabet
  if (action.type === 'GET_FOOD') {
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

  //! Reducer to get tipo
  if (action.type === 'GET_TIPOS') {
    return {
      ...state,
      loading: true,
      tipo: action.payload,
      // eslint-disable-next-line
      loading: false,
    }
  }

  //! Reducer to get filtered foods
  if (action.type === 'FILTER') {
    return {
      ...state,
      loading: true,
      filteredFoods: action.payload,
      // eslint-disable-next-line
      loading: false,
    }
  }

  //! Reducer to get foods ordered by alphabet from A-Z
  if (action.type === 'AZ') {
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

  //! Reducer to get foods ordered by alphabet from Z-A
  if (action.type === 'ZA') {
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

  // //! Promedy weight range to get a number and be able to order
  // state.allFoods.forEach((b) => {
  //   if (typeof b.weight === 'string') {
  //     let range = b.weight.split('- ')
  //     let promedy = (parseInt(range[0]) + parseInt(range[1])) / 2
  //     b.weight = promedy
  //   }
  //   // if (typeof b.weight === 'number') {
  //   //   let promedy = (b.weight[0])
  //   //   b.weight = promedy
  //   // }
  // })

  //! Reducer to get foods ordered by weight promedy Light to Heavy
  if (action.type === 'LH') {
    return {
      ...state,
      loading: true,
      allFoods: state.allFoods
        .filter((b) => b.weight !== null)
        .sort((a, b) => (a.weight > b.weight ? 1 : -1)),
      searchedFood: state.searchedFood
        .filter((b) => b.weight !== null)
        .sort((a, b) => (a.weight > b.weight ? 1 : -1)),
      filteredFoods: state.filteredFoods
        .filter((b) => b.weight !== null)
        .sort((a, b) => (a.weight > b.weight ? 1 : -1)),
      // eslint-disable-next-line
      loading: false,
    }
  }

  //! Reducer to get foods ordered by weight promedy Heavy to Light
  if (action.type === 'HL') {
    return {
      ...state,
      loading: true,
      allFoods: state.allFoods
        .filter((b) => b.weight !== null)
        .sort((a, b) => (a.weight < b.weight ? 1 : -1)),
      searchedFood: state.searchedFood
        .filter((b) => b.weight !== null)
        .sort((a, b) => (a.weight < b.weight ? 1 : -1)),
      filteredFoods: state.filteredFoods
        .filter((b) => b.weight !== null)
        .sort((a, b) => (a.weight < b.weight ? 1 : -1)),
      // eslint-disable-next-line
      loading: false,
    }
  }

  return state
}

export default rootReducer
