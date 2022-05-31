import React from 'react'
import style from './landing.module.css'
import { useHistory } from 'react-router'

//! Basic Landing Page with button to push user to /home
function LandingPage() {
  const history = useHistory()
  return (
    <>
      <div className={style.landing}>
         <h2>DOGS Main Page</h2>
        <div className={style.contentCarrousel}>
          <figure><div className={style.img1}>Robin</div></figure>
          <figure><div className={style.img2}></div></figure>
          <figure><div className={style.img3}></div></figure>
          <figure><div className={style.img4}></div></figure>
          <figure><div className={style.img5}></div></figure>
          <figure><div className={style.img6}></div></figure>
          <figure><div className={style.img7}></div></figure>
          <figure><div className={style.img8}></div></figure>
          <figure><div className={style.img9}></div></figure>
          <figure><div className={style.img10}></div></figure>
        </div>
        <button className={style.button} onClick={() => history.push('/home')}>
          Enter
        </button>
      </div>
    </>
  )
}
export default LandingPage
