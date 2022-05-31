import React from 'react'
import style from './card.module.css'
import { Link } from 'react-router-dom'

//! Simple Card Component to show Breeds on Home Page
function Card({ id, title, image }) {
  return (
    <div className={style.card}>
      <p className={style.title}>{title}</p>
      <div className={style.imgContainer}>
        <img src={image} className={style.cardImg} alt="food" />
      </div>
      <Link to={`/detail/${id}`}>
        <button className={style.myButton}>More Info</button>
      </Link>
    </div>
  )
}

export default Card
