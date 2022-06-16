import React from 'react'
import style from './food.module.css'
import { Link } from 'react-router-dom'
import { filterLang } from '../../actions';
import { useSelector } from 'react-redux'
//  

function capitalizeWords(arr) {
  return arr.map(element => {
    return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  });
}

function Card({ id, title, image, healthScore, diets }) {

  const idioma = useSelector((state) => state.idioma)
  const lang = useSelector((state) => state.lang)
  let idiomas = filterLang(idioma, 'FOOD', lang)
  
  return (
    <div className={style.card}>
      <p className={style.title}>{title}</p>
      <div className={style.imgContainer}>
        <img src={image} className={style.cardImg} alt="food" />
      </div>
      {diets ? (
        <p className={style.info}>{idiomas[1]}: {capitalizeWords(diets).join(', ')}</p>
      ) : null}
      <Link to={`/recipes/detail/${id}`}>
        <button className={style.myButton}>{idiomas[0]}</button>
      </Link>
    </div>
  )
}

export default Card
