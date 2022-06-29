import React, { useEffect } from 'react'
import style from './detail.module.css'
import { Link } from 'react-router-dom'
import { getFood, filterLang, resetFood } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import imagen from "../../image/arrow.png"

//import parse from "html-react-parser";

export default function Food(id) {

  const food = useSelector(state => state.foodDetail)
  const idioma = useSelector((state) => state.idioma)
  const lang = useSelector((state) => state.lang)

  const dispatch = useDispatch()
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
// Primer Digito a Mayusculas
  function capitalizeWords(arr) {
    return arr.map(element => {
      return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    });
  }

  let newArray = []
  let idiomas = filterLang(idioma, 'DETAIL', lang)
  console.log('food: ', food);
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
                <h3>{idiomas[0]}</h3>
                <p dangerouslySetInnerHTML={createMarkup(food.instructions)} />
              </div>
            ) : null}
            <div className={style.dataContainer}>
              <label className={style.info}><b>{idiomas[1]}: </b>{food.healthScore}</label>
              {food.aggregateLikes ? (
                <label className={style.info}><b>{idiomas[2]}:&nbsp;</b>{food.aggregateLikes}</label>
              ) :
                <label className={style.info}><b>{idiomas[2]}:&nbsp;</b>{food.likes}</label>
              }
              {food.sourceName ? (
                <label className={style.info}><b>Source Name :</b>{food.sourceName} </label>
              ): null}
              {food.diets ? (
                <label className={style.info}><b>{idiomas[3]}:&nbsp;</b>{capitalizeWords(food.diets).join(', ')}</label>
              ) : null}
              {food.dishTypes ? (
                <label className={style.info}><b>{idiomas[4]}:&nbsp; </b>{capitalizeWords(food.dishTypes).join(', ')}</label>
              ) : null}
              {food.tipos ? (
                <div className={style.dataContainer}>
                  {food.tipos &&
                    food.tipos.map((t) => {
                      newArray.push(t.nombre)
                      // return <label className={style.info}>{t.nombre}</label>
                      return 'ok'
                    }
                    )}
                  <label className={style.info}><b>Dish Types:&nbsp; </b>{capitalizeWords(newArray).join(', ')}</label>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div>
            <p className={style.blink_1}>Please Wait...</p>
          </div>
        )}
      </div>
      <Link to="/home" className={style.arrow}>
        {/* <span className="fas fa-caret-square-right"></span> */}
        <p> <img className={style.arrowImg} src={imagen} alt="" /></p>
      </Link>
    </div>
  )
}
