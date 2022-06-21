import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFoods, setLoading, filterLang } from './../../actions/index'
import Card from '../Food/Food'
import FilterSort from '../FilterSort/FilterSort'
import style from './home.module.css'

export default function Home({ input, setInput }) {
    console.log('input: ', input);

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

    const idioma = useSelector((state) => state.idioma)
    const lang = useSelector((state) => state.lang)

    let idiomas = []
    idiomas = filterLang(idioma, 'HOME', lang)

    function displayFoods(array) {
        if (!array) {
            return (
                <div className={style.notFoundMsg}>
                    <p className={style.notFoundMsg}>{idiomas[0]}</p>
                    <button
                        className={style.button}
                        onClick={() => (window.location.href = '/home')}>
                        Home
                    </button>
                </div>
            )
        }
        // hago el paginado         
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
                    healthScore={food.healthScore}
                    diets={food.diets}
                    key={food.id} />
            })
        ) : input === "" ? (
            <p className={style.blink_1}>{idiomas[1]}</p>
        ) :(
            <div className={style.notFoundMsg}>
                <p className={style.notFoundMsg}>{idiomas[0]}</p>
                <button
                    className={style.button}
                    onClick={() => (window.location.href = '/home')}>
                    {idiomas[5]}
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
                        <p className={style.blink_1}>{idiomas[1]}</p>
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
                            className={style.buttonpage}>
                            {idiomas[2]}
                        </button>
                    )}
                    {pageNumber === 0 ? null : (
                        <button
                            onClick={() => setPageNumber(0)}
                            className={style.buttonpage}>
                            {idiomas[3]}
                        </button>
                    )}
                    <button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        className={style.buttonpage}>
                        {idiomas[4]}
                    </button>
                </div>
            </div>
        </div>
    )
}

