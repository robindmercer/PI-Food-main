import React, { useEffect, useState } from 'react'
import { sortFoods, getTipos,filter } from '../../actions/index'
//import { orderByWeight } from '../../actions/index'
import { useSelector, useDispatch } from 'react-redux'
import style from './filtersort.module.css'


function FilterSort() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTipos())
    // eslint-disable-next-line
  }, [])

  //! Importing tipos and all foods to handle filtering
  const tipos = useSelector((state) => state.tipos)
  const foods = useSelector((state) => state.allFoods)

  let [selectedTemp, setSelectedTemp] = useState('')
  let [tempToFilterBy, setTempToFilterBy] = useState([])

  //! Setting what to do onClick
  function handleClick() {
    let filtered = []
    foods.forEach((b) => {
      b.tipos.map((t) =>
        t.name === selectedTemp ? filtered.push(b) : null,
      )
    })
    dispatch(filter(filtered))
  }

  //! Resetting Tipos sets the filter to empty
  function resetTemps(e) {
    dispatch(filter([]))
  }

  //! Setting what to do in case of tipo selection change
  function handleChangeTemp(e) {
    setSelectedTemp(e.target.value)
  }

  //! Setting what to do on Submit
  function handleSubmit(e) {
    e.preventDefault()
    setTempToFilterBy([...tempToFilterBy, selectedTemp])
  }

  //! Setting what to do if ordering is selected
  function handleOrder(e) {
    dispatch(sortFoods(e.target.value))
  }

  //! Setting what to do if ordering is selected by weight
  // function handleOrderByWeight(e) {
  //   dispatch(orderByWeight(e.target.value))
  // }

  return (
    //! Form to select Tipo al filter by it
    <div className={style.mainContainer}>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <select
          onChange={handleChangeTemp}
          name="tipos"
          value={selectedTemp}
          className={style.select}
        >
          <option>Filter Tipo</option>
          {/* {tipos.map((e) => (
            <option value={e.nombre} key={e.id}>
              {e.nombre}
            </option>
          ))} */}
        </select>
        <div className={style.btnContainer}>
          <button onClick={() => handleClick()} className={style.button}>
            Filter
          </button>
          <button onClick={resetTemps} className={style.button}>
            Clear
          </button>
        </div>
      </form>

      {/* <form className={style.formContainer}>
        <p className={style.text}>Order By Weight</p>
        <select onChange={handleOrderByWeight} className={style.select}>
          <option value="">Filter By Weight</option>
          <option value="HL">Heavy to Light</option>
          <option value="LH">Light to Heavy</option>
        </select>
      </form> */}

      <form className={style.formContainer}>
        <p className={style.text}>Order By Letter</p>
        <select onChange={handleOrder} className={style.select}>
          <option value="">Filter by Recepi</option>
          <option value="AZ">Ascending</option>
          <option value="ZA">Descending</option>
        </select>
      </form>
      <button
        className={style.clearbutton}
        onClick={() => (window.location.href = '/home')}
      >
        Clear All Filters
      </button>
    </div>
  )
}

export default FilterSort
