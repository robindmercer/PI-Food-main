import React from 'react'
import './landing.module2.css'
import { useHistory } from 'react-router'

// Landing Page - includes button to go to HOME
function LandingPage() {
  const history = useHistory()
  return (
    <>
    <div className="landing">
        <div className="content-all">
        <div className="content-carrousel">
            <figure><img src="https://www.bing.com/th?id=OIP.lEa60MoPEz7kNWZQBc_a3wHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="" /></figure>
            <figure><img src="https://th.bing.com/th/id/OIP.IwbWGr7qz8VmxzhHYNsh4QHaFA?w=281&h=190&c=7&r=0&o=5&pid=1.7" alt="" /></figure>
            <figure><img src="https://th.bing.com/th/id/OIP.fL1x--vRd7BhnIOzwUdauwHaFj?w=256&h=192&c=7&r=0&o=5&pid=1.7" alt="" /></figure>
            <figure><img src="https://th.bing.com/th/id/OIP.orOANAZS_Gjo2C_b5UoMlAHaFJ?w=286&h=198&c=7&r=0&o=5&pid=1.7" alt="" /></figure>
            <figure><img src="https://th.bing.com/th/id/OIP.0tW4TOU7hluytFYSp16-BgHaE7?w=288&h=192&c=7&r=0&o=5&pid=1.7" alt="" /></figure>
            <figure><img src="https://th.bing.com/th/id/OIP.0uRBE3g35B2v-Yp575bCLwHaE8?w=298&h=198&c=7&r=0&o=5&pid=1.7" alt="" /></figure>
            <figure><img src="https://th.bing.com/th/id/OIP.xfboPEcE0WGoVUi8sL-1tQHaFN?w=252&h=180&c=7&r=0&o=5&pid=1.7" alt="" /></figure>
            <figure><img src="https://th.bing.com/th/id/OIP.OEgfRZIuGoHFbw5gjPKGHgHaE6?w=280&h=185&c=7&r=0&o=5&pid=1.7" alt="" /></figure>
            <figure><img src="https://th.bing.com/th/id/OIP.9InhvXGUz4DQ1B1tPh6tawHaE7?w=257&h=180&c=7&r=0&o=5&pid=1.7" alt="" /></figure>
            <figure><img src="https://th.bing.com/th/id/OIP.BCV4H69DAbjkgKz5-Dk_IwHaFj?w=235&h=180&c=7&r=0&o=5&pid=1.7" alt="" /></figure>
          </div>
        </div>
        <div className="msgContainer">
          <h2 className='text-pop-up-top'>FOOD Application</h2>
          <div>
            <button className="button" onClick={() => history.push('/home')}>
              Enter
            </button>
          </div>
        </div>
    </div>
    </>
  )
}
export default LandingPage
