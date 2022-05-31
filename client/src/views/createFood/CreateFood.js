import React from 'react'
import style from './createfood.module.css'
import Create from './../../components/create/Create'
import { Link } from 'react-router-dom'

//! View to present Create Component

function CreateFood() {
  return (
    <div className={style.mainContainer}>
      <Link to="/home" className={style.arrow}>
        <span class="fas fa-caret-square-right"></span>
      </Link>
      <div className={style.secondContainer}>
        <p className={style.title}>Create Food</p>
        <Create />
      </div>
    </div>
  )
}

export default CreateFood
