import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from './food.module.css'
import { Link } from 'react-router-dom'

export default function Food(id) {
  const [food, setFood] = useState()

  useEffect(() => {
    axios.get(`/recipe/${id.id}`)
    .then((result) => setFood(result.data))
    // eslint-disable-next-line
  }, [])

  return (
    <div className={style.mainContainer}>
      <div className={style.secondContainer}>
        {food ? (
          <div className={style.foodContainer}>
            <p className={style.title}>{food.title}</p>
            <div className={style.imgContainer}>
              <img src={food.image} className={style.img} alt="recipe" />
            </div>
            <div className={style.dataContainer}>
              <p className={style.info}>Weight: {food.weight} kg</p>
              <p className={style.info}>Height: {food.height} cm</p>
              <p className={style.info}>Life Span: {food.life_span}</p>
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
            </div>
          </div>
        ) : (
          <div>
            <i className="fas fa-spinner fa-spin spinner"></i>
          </div>
        )}
      </div>
      <Link to="/home" className={style.arrow}>
        <span class="fas fa-caret-square-right"></span>
      </Link>
    </div>
  )
}
