import React, { useEffect } from 'react'
import style from './detail.module.css'
import { Link } from 'react-router-dom'
import { getFood,resetFood } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
//import parse from "html-react-parser";

export default function Food(id) {
  const food = useSelector(state => state.foodDetail)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFood(id.id))
    return(
      dispatch(resetFood())
    ) 
    // eslint-disable-next-line
  }, [])


// Convierte HTML
function createMarkup(xtext) {
  return { __html: xtext}
}

function capitalizeWords(arr) {
    return arr.map(element => {
      return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    });
}

  return (
    <div className={style.mainContainer}>
      <div className={style.secondContainer}>
        {food ? (
          <div className={style.foodContainer}>
            <p className={style.title}>{food.title}</p>
            <div className={style.header}>
              <div className={style.imgContainer}>
                <img src={food.image} className={style.img} alt="recipe" />
              </div>
              <div className={style.imgtext}>
                <p className={style.instructions} dangerouslySetInnerHTML={createMarkup(food.summary)} />
              </div>
            </div>
            <div className={style.instructions}>
             <h3>Instructions</h3>
             <p dangerouslySetInnerHTML={createMarkup(food.instructions)} />
            </div>
            <div className={style.dataContainer}>
              <p className={style.info}>Health Score: {food.healthScore}</p>
              {food.diets ? (
                <p className={style.info}>Diets: {capitalizeWords(food.diets).join(', ')}</p>
              ) : null}
              {food.dishTypes ? (
                <p className={style.info}>Dish Types: {capitalizeWords(food.dishTypes).join(', ')}</p>
              ) : null}
              {food.tipos ? (
                <div className={style.info}>
                  <div className={style.tempButtons}>
                    {food.tipos &&
                      food.tipos.map((t) => {
                        return <p className={style.temperament}>{t.nombre}</p>
                      })}
                  </div>
                </div>
              ) : null}
              {food.platos ? (
                <div className={style.info}>
                  <div className={style.tempButtons}>
                    {food.platos &&
                      food.platos.map((t) => {
                        return <p className={style.temperament}>{t.nombre}</p>
                      })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div>
            <p className={style.blink_1}>Wait</p>
          </div>
        )}
      </div>
      <Link to="/home" className={style.arrow}>
        <span className="fas fa-caret-square-right"></span>
      </Link>
    </div>
  )
}
