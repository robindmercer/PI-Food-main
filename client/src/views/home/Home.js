import React, { useState, useEffect } from 'react'
import { getFoods, setLoading } from './../../actions/index'
import Card from './../../components/card/Card'
import { useDispatch, useSelector } from 'react-redux'
import style from './home.module.css'
import FilterSort from '../../components/filtersort/FilterSort'

function Home({ input, setInput }) {
  const dispatch = useDispatch()
  const foods = useSelector((state) => state.allFoods)
  const loading = useSelector((state) => state.loading)
  const filteredFoods = useSelector((state) => state.filteredFoods)

  useEffect(() => {
    dispatch(setLoading())
    dispatch(getFoods())
    // eslint-disable-next-line
  }, [])

  const [pageNumber, setPageNumber] = useState(0)
  const [foodsPerPage] = useState(9)
  const pagesVisited = pageNumber * foodsPerPage

  function displayFoods(array) {
    if (array.message) {
      return (
        <div className={style.notFoundMsg}>
          <p className={style.notFoundMsg}>Recipe not found</p>
          <button
            className={style.button}
            onClick={() => (window.location.href = '/home')}
            >
            Home
          </button>
        </div>
      )
    }
    
    let foodsToDisplay = array?.filter((b) => b.title.toLowerCase().includes(input.toLowerCase()))
      .slice(pagesVisited, pagesVisited + foodsPerPage)

    return foodsToDisplay.length ? (
      foodsToDisplay.map((food) => {
        // console.log('food.title: ', food.title);
        // console.log('food.image: ', food.image);
        // console.log('food.id: ', food.id);
        return <Card id={food.id} title={food.title} image={food.image} key={food.id}/>
      })
    ) : (
      <div className={style.notFoundMsg}>
        <p className={style.notFoundMsg}>No Dog Found</p>
        <button
          className={style.button}
          onClick={() => (window.location.href = '/home')}
        >
          Home
        </button>
      </div>
    )
  }

  return (
    <div className={style.mainContainer}>
      <FilterSort />
      <div>
        <div className={style.container}>
          {loading ? (
            <i className="fas fa-spinner fa-spin spinner"></i>
          ) : filteredFoods.length > 0 ? (
            displayFoods(filteredFoods)
          ) : (
            displayFoods(foods)
          )}
        </div>
        <div className={style.paginateContainer}>
          {pageNumber === 0 ? null : (
            <button
              onClick={() => {
                setPageNumber(pageNumber - 1)
              }}
              className={style.buttonpage}
            >
              Previous
            </button>
          )}
          {pageNumber === 0 ? null : (
            <button
              onClick={() => setPageNumber(0)}
              className={style.buttonpage}
            >
              Home
            </button>
          )}
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            className={style.buttonpage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
