import React from 'react'
import style from './food.module.css'
import { Link } from 'react-router-dom'

//! Simple Card Component to show Breeds on Home Page
function Card({ id, title, image, diets }) {
  //console.log('diets: ', diets);
  // if (diets) {
  //   capitalizeWords(diets)
  // }
  
  function capitalizeWords(arr) {
    console.log('capitalizeWords: ', capitalizeWords);
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
