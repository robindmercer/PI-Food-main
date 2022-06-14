import React from 'react'
import style from './food.module.css'
import { Link } from 'react-router-dom'

//  
function Card({ id, title, image,healthScore, diets }) {
  
  function capitalizeWords(arr) {
      return arr.map(element => {
        return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
      });
    }



  return (
    <div className={style.card}>
      <p className={style.title}>{title}</p>
      <div className={style.imgContainer}>
        <img src={image} className={style.cardImg} alt="food" />
      </div>
      {diets ? (
        <p className={style.info}>Dish Types: { capitalizeWords(diets).join(', ')}</p>
      ) : null}
      <Link to={`/recipes/detail/${id}`}>
        <button className={style.myButton}>More Info</button>
      </Link>
    </div>
  )
}

export default Card
