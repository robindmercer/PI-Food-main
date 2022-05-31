import React from 'react'
import style from './landing.module.css'
import { useHistory } from 'react-router'

//! Basic Landing Page with button to push user to /home
function LandingPage() {
  const history = useHistory()
  return (
    <>
      <div className={style.landing}>
        <div className={style.msgContainer}>
          <p className={style.title}>FOOD Application</p>
          <div>
            <button className={style.button} onClick={() => history.push('/home')}>
              Enter
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default LandingPage
