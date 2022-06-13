import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFoods, setLoading } from './../../actions/index'
import Card from '../Food/Food'
import FilterSort from '../FilterSort/FilterSort'
import style from './home.module.css'

export default function Home({ input, setInput }) {
    const dispatch = useDispatch();
    const filteredFoods = useSelector((state) => state.filteredFoods)
    const foods = useSelector((state) => state.allFoods)
    const loading = useSelector((state) => state.loading)
    
    useEffect(() => {
        dispatch(setLoading())
        dispatch(getFoods());
        // eslint-disable-next-line 
    }, [])
    
    const [pageNumber, setPageNumber] = useState(0)
    const [foodsPerPage] = useState(9)  // cantidad de recetas a mostrar   
    const pagesVisited = pageNumber * foodsPerPage
    var showPie = true
    
    function displayFoods(array) {
        if (array.message) {
            return (
                <div className={style.notFoundMsg}>
                    <p className={style.notFoundMsg}>Recipe not found</p>
                    <button
                        className={style.button}
                        onClick={() => (window.location.href = '/home')}>
                        Home
                    </button>
                </div>
            )
        }
        
        let foodsToDisplay = array?.filter((b) => b.title.toLowerCase().includes(input.toLowerCase()))
        .slice(pagesVisited, pagesVisited + foodsPerPage)
        if (!foodsToDisplay.length) {
             showPie = false
        }
        return foodsToDisplay.length ? (
            foodsToDisplay.map((food) => {
                return <Card
                    id={food.id}
                    title={food.title}
                    image={food.image}
                    diets={food.diets}
                    key={food.id} />
                })
                ) : (
            <div className={style.notFoundMsg}>
                <p className={style.notFoundMsg}>No Recipes Found</p>
                <button
                    className={style.button}
                    onClick={() => (window.location.href = '/home')}>
                    Back Home
                </button>
            </div>
        )
    }

    // renderizo
    return (
        <div className={style.mainContainer}>
            <FilterSort />
            <div>
                <div className={style.container}>
                    {loading ? (
                        <p className={style.blink_1}>Please Wait...</p>
                    ) : filteredFoods.length > 0 ? (
                        displayFoods(filteredFoods)
                    ) : (
                        displayFoods(foods)
                    )}
                </div>
                <div className={showPie ? style.paginateContainer : style.noneDisplay}>
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