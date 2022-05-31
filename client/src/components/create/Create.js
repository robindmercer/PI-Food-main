import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTipos } from '../../actions/index'
import axios from 'axios'
import style from './create.module.css'

//! Create Page Component - With Form and Validators
function validateForm(input) {
  let errors = {}
  if (!input.name) {
    errors.name = 'Name is required'
  } else {
    errors.name = ''
  }
  if (!input.weight) {
    errors.weight = 'Weight is required'
  } else {
    errors.weight = ''
  }

  if (!input.height) {
    errors.height = 'Height is required'
  } else {
    errors.height = ''
  }
  if (!input.life_span) {
    errors.life_span = 'Lifespan is required'
  } else {
    errors.life_span = ''
  }
  return errors
}

//! Create Page Component - Function to create a new Recipe
function Create() {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [input, setInput] = useState({
    name: '',
    height: '',
    weight: '',
    life_span: '',
    tipo: [],
  })

  const dispatch = useDispatch()

  //! Create Page Component - Importing of Tipo to make the avaliable
  useEffect(() => {
    dispatch(getTipos())
    // eslint-disable-next-line
  }, [])

  const tipo = useSelector((state) => state.tipo)

  //! Create Page Component - Function to handle the inputs
  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      }),
    )
  }

  //! Create Page Component - Function to handle click on the input
  function onFocus(ev) {
    setTouched({
      ...touched,
      [ev.target.name]: true,
    })
  }

  //! Create Page Component - Function to handle the submit
  function handleSubmit(e) {
    e.preventDefault()
    if (!errors.name && !errors.weight && !errors.height && !errors.life_span) {
      axios
        .post('/recipe', input)
        .then((r) => {
          alert('Your Recipe was added to the Database')
          setInput({
            name: '',
            title: '',
            weight: '',
            life_span: '',
            tipo: [],
          })
        })
        .catch((res) => alert('Could not create Recipe'))
    } else {
      alert('Ups... there was a problem ¯_(ツ)_/¯')
    }
  }

  //! Create Page Component - Function to handle repeated tipo selected
  function handleSelect(e) {
    if (input.tipo.includes(parseInt(e.target.value))) {
      alert('Please, don´t repeat yourself (•_•)')
    } else {
      setInput((prev) => ({
        ...prev,
        tipo: [...prev.tipo, parseInt(e.target.value)],
      }))
    }
  }

  //! Create Page Component - Function to delete a selected tipo
  function deleteTemp(_e, t) {
    setInput((prev) => ({
      ...prev,
      tipo: prev.tipo.filter((temp) => temp !== parseInt(t)),
    }))
  }

  //! Create Page Component - Function to get names of tipo
  function getNames(arr) {
    let names = []
    tipo.forEach((t) => {
      arr.forEach((id) => {
        if (parseInt(id) === t.id) {
          names.push(t.name)
        }
      })
    })
    return names
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <div className={style.inputsContainer}>
          <div className={style.inputContainer}>
            <p className={style.secondTitle}>Name</p>
            <input
              type="text"
              name="name"
              placeholder="Recipe Title"
              onChange={handleInput}
              required="required"
              onFocus={onFocus}
              value={input.name}
              className={style.input}
            ></input>
            {errors.name && touched.name && (
              <p className={style.error}>{errors.name}</p>
            )}
          </div>

          <div className={style.inputContainer}>
            <p className={style.secondTitle}>Weight</p>
            <input
              type="text"
              name="weight"
              placeholder="Weight Range"
              onChange={handleInput}
              required="required"
              onFocus={onFocus}
              value={input.weight}
              className={style.input}
            ></input>
            {errors.weight && touched.weight && (
              <p className={style.error}>{errors.weight}</p>
            )}
          </div>

          <div className={style.inputContainer}>
            <p className={style.secondTitle}>Height</p>
            <input
              type="text"
              name="height"
              placeholder="Height Range"
              onChange={handleInput}
              required="required"
              onFocus={onFocus}
              value={input.height}
              className={style.input}
            ></input>
            {errors.height && touched.height && (
              <p className={style.error}>{errors.height}</p>
            )}
          </div>

          <div className={style.inputContainer}>
            <p className={style.secondTitle}>Life span</p>
            <input
              type="text"
              name="life_span"
              placeholder="Life span Range"
              onChange={handleInput}
              required="required"
              onFocus={onFocus}
              value={input.life_span}
              className={style.input}
            ></input>
            {errors.life_span && touched.life_span && (
              <p className={style.error}>{errors.life_span}</p>
            )}
          </div>
        </div>

        <div className={style.selectTempContainer}>
          <p className={style.secondTitle}>Tipo</p>
          <select
            name="tipo"
            onChange={(e) => handleSelect(e)}
            className={style.select}
            required
            value={input.tipo}
          >
            <option>Choose tipo</option>

            {tipo.map((e) => (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.tempButtons}>
          {input.tipo.map((t) => (
            <p id={t} className={style.tipo}>
              {getNames([t])}{' '}
              <button
                type="button"
                className={style.tempButton}
                onClick={(e) => deleteTemp(e, t)}
              >
                X
              </button>
            </p>
          ))}
        </div>
        <button className={style.button} type="submit">
          Create Recipe
        </button>
      </form>
    </div>
  )
}

export default Create
