import React, { useEffect } from 'react'
import style from './detail.module.css'
import { Link } from 'react-router-dom'
import { getFood, resetFood } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
//import parse from "html-react-parser";

export default function Food(id) {
  const food = useSelector(state => state.foodDetail)

  const dispatch = useDispatch()
  console.log('food: ', food);
  useEffect(() => {
    dispatch(getFood(id.id))
    return (
      dispatch(resetFood())
    )
    // eslint-disable-next-line
  }, [])


  // Convierte HTML
  function createMarkup(xtext) {
    return { __html: xtext }
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
            {food.instructions ? (
              <div className={style.instructions}>
                <h3>Instructions</h3>
                <p dangerouslySetInnerHTML={createMarkup(food.instructions)} />
              </div>
            ) : null}
            <div className={style.dataContainer}>
              <label className={style.info}><b>Health Score: </b>{food.healthScore}</label>
              {food.aggregateLikes ? (
                <label className={style.info}><b>Likes: </b>{food.aggregateLikes}</label>
              ) :
                <label className={style.info}><b>Likes: </b>{food.likes}</label>
              }
              {food.diets ? (
                <label className={style.info}><b>Diets: </b>{capitalizeWords(food.diets).join(', ')}</label>
              ) : null}
              {food.dishTypes ? (
                <label className={style.info}><b>Dish Types: </b>{capitalizeWords(food.dishTypes).join(', ')}</label>
              ) : null}
              {food.tipos ? (
                <div className={style.info}>
                  <div className={style.tempButtons}><b>Dish Types: </b> 
                    {food.tipos &&
                      food.tipos.map((t) => {
                        return <label className={style.temperament}>{t.nombre}</label>
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
