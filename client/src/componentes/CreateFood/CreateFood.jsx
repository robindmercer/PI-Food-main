import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTipos,setOffSearch } from '../../actions/index'
import axios from 'axios'
import style from './create.module.css'

//  - With Form and Validators
function validateForm(input) {
  let errors = {}
  if (!input.title) {
    errors.title = 'Title is required'
  } else {
    errors.title = ''
  }
  if (!input.summary) {
    errors.summary = 'Description is required'
  } else {
    errors.summary = ''
  }

  if (!input.healthScore) {
    errors.healthScore = 'Food Health is required'
  } else {
    if (input.healthScore > 999) {
      errors.healthScore = 'Sorry Helth Score is from 0 to 999'
    } else {
      errors.healthScore = ''
    }
  }
  if (!input.likes) {
    errors.likes = 'Puntuacion is required'
  } else {
    errors.likes = ''
  }
  if (!input.instructions) {
    errors.instructions = 'Instructions is required'
  } else {
    errors.instructions = ''
  }
  return errors
}

// Crea nueva receta
function Create() {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [input, setInput] = useState({
    title: '',
    likes: '',
    summary: '',
    healthScore: '',
    instructions: '',
    tipo: [],
  })

  const dispatch = useDispatch()

  // Get Tipos 
  useEffect(() => {
    dispatch(setOffSearch())
    dispatch(getTipos())
    // eslint-disable-next-line
  }, [])

  const tipos = useSelector((state) => state.tipo)

  // Handle Inputs
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

  // Function to handle click on the input
  function onFocus(ev) {
    setTouched({
      ...touched,
      [ev.target.name]: true,
    })
  }



  //  - Function to handle the submit
  function handleSubmit(e) {
    e.preventDefault()
    //console.log('e: ', input);
    if (!errors.title && !errors.summary && !errors.healthScore && !errors.instructions && !errors.likes) {
      axios
        .post('/recipes', input)
        .then((r) => {
          alert('Your Recipe was added to the Database.')
          setInput({
            title: '',
            likes: '',
            resumen: '',
            nivel: '',
            receta: '',
            tipo: [],
          })
        })
        .catch((res) => {
          console.log('Error', res)
          alert('Could not create Recipe')
        })
    } else {
      alert('Ups... there was a problem')
    }
  }

  // Function to handle repeated selectes
  function handleSelectTipo(e) {
    if (input.tipo.includes(parseInt(e.target.value))) {
      alert('You have already selected this item')
    } else {
      setInput((prev) => ({
        ...prev,
        tipo: [...prev.tipo, parseInt(e.target.value)],
      }))
    }
  }

  //  Delete a selected tipo
  function deleteTipo(_e, t) {
    setInput((prev) => ({
      ...prev,
      tipo: prev.tipo.filter((temp) => temp !== parseInt(t)),
    }))
  }

  //  Get names of tipos
  function getNamesTipo(arr) {
    let names = []
    tipos.forEach((t) => {
      arr.forEach((id) => {
        if (id === parseInt(t.id)) {
          names.push(t.nombre)
        }
      })
    })
    return names
  }
  // renderizo
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.formDetail}>
        <div className={style.inputsContainer}>
          <div className={style.inputContainer}>
            <label htmlFor="title" className={style.secondTitle}>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Youre recipe title"
              onChange={handleInput}
              required="required"
              onBlur={onFocus}
              value={input.title}
              className={style.input}
            ></input>
            {errors.title && touched.title && (
              <p className={style.error}>{errors.title}</p>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="summary" className={style.secondTitle}>Summary</label>
            <textarea
              type="text"
              name="summary"
              placeholder="Give me a little Summary"
              onChange={handleInput}
              required="required"
              onBlur={onFocus}
              value={input.summary}
              className={style.textareaStyle}
            ></textarea>
            {errors.summary && touched.summary && (
              <p className={style.error}>{errors.summary}</p>
            )}
          </div>
          <div className={style.inputNumberContainer}>
            <div className={style.inputContainer}>
              <label htmlFor="healthScore" className={style.secondTitle}>Food Health Level</label>
              <input
                type="number"
                name="healthScore"
                placeholder="Health Level"
                onChange={handleInput}
                required="required"
                min="0"
                max="999"
                onBlur={onFocus}
                value={input.healthScore}
                className={style.inputNumbers}
              ></input>
              {errors.healthScore && touched.healthScore && (
                <p className={style.error}>{errors.healthScore}</p>
              )}
            </div>

            <div className={style.inputContainer}>
              <label htmlFor="likes" className={style.secondTitle}>Likes</label>
              <input
                type="number"
                name="likes"
                placeholder="Likes"
                min="0"
                max="999"
                onChange={handleInput}
                required="required"
                onBlur={onFocus}
                value={input.likes}
                className={style.inputNumbers}
              ></input>
              {errors.likes && touched.likes && (
                <p className={style.error}>{errors.likes}</p>
              )}
            </div>
          </div>


          <div className={style.inputContainer}>
            <label htmlFor="instructions" className={style.secondTitle}>Instructions</label>
            <textarea
              type="text"
              name="instructions"
              placeholder="Instructions"
              onChange={handleInput}
              required="required"
              onBlur={onFocus}
              value={input.instructions}
              className={style.textareaStyle}
            ></textarea>
            {errors.instructions && touched.instructions && (
              <p className={style.error}>{errors.instructions}</p>
            )}
          </div>
        </div>

        <div  className={style.selectTipo}>
          <div className={style.inputSelContainer}>
            <label htmlFor="tiposSel" className={style.secondTitle}>Tipos</label>
            <select
              id="tiposSel"
              name="tiposSel"
              onChange={(e) => handleSelectTipo(e)}
              className={style.select}
              required
              value={input.tipo}>
              <option>Choose tipo</option>
              {tipos.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={style.tempButtons}>
            {input.tipo.map((t) => (
              <div id={t} className={style.tipo}>
                {getNamesTipo([t])}{' '}
                <button
                  type="button"
                  className={style.tempButton}
                  onClick={(e) => deleteTipo(e, t)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={style.containerButtton}>
          <button className={style.button} type="submit" name="grabar">
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create
