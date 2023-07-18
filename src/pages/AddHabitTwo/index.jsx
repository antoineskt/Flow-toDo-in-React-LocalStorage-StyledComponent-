import { useState } from 'react'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'

dayjs.locale({
  ...fr,
  weekStart: 1,
})

const StyledContaineur = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledH1 = styled.h1`
  font-size: 4em;
`

const StyledInput = styled.input`
  font-size: 2em;
  border-radius: 7px;
`

const StyledContainerDaysButton = styled.div`
  font-size: 1.5em;
  margin: 1em;
`

function AddHabitTwo() {
  const [name, setName] = useState('')
  const [blueColor, setBlueColor] = useState('white')
  const [selectedDate, setSelectedDate] = useState(null)

  const StyledDaysButton = styled.button`
    font-size: 1em;
    margin: 5px;
    width: 70px;
    height: 70px;
    border-radius: 30%;
    &:hover {
      background-color: #faca21;
    }
    background-color: ${blueColor};
  `

  const startOfWeek = dayjs().startOf('week')

  const weekdays = new Array(7)
    .fill(startOfWeek)
    .map((day, idx) => day.add(idx, 'day'))

  const handleDayClick = (day) => {
    const blue = '#0000FF'
    setBlueColor(blue)
    const formattedDate = day.format('dddd D MMMM')
    if (selectedDate !== null) {
      const multipleDate = [...selectedDate, formattedDate]
      setSelectedDate(multipleDate)
    }
    setSelectedDate(formattedDate)
  }

  function handleInput(e) {
    setName(e.target.value)
  }

  function saveData() {
    if (name !== '') {
      console.log('le name est ' + name)
      const newDatas = {
        id: `todo-${nanoid()}`,
        name: name,
        completed: false,
        date: selectedDate,
      }
      const getDataFromLS = JSON.parse(localStorage.getItem('todos'))
      if (getDataFromLS) {
        const newDatasForLS = [...getDataFromLS, newDatas]
        console.log('log de newdatasForLS : ' + newDatasForLS)
        localStorage.setItem('todos', JSON.stringify(newDatasForLS))
        setName('')
      } else {
        console.log('log de newDatas : ' + JSON.stringify(newDatas))
        localStorage.setItem('todos', JSON.stringify([newDatas])) //je mets un tableau ici pr créer un tableau d'objets
        setName('')
      }
    } else return console.log('pas de data entrée')
  }

  return (
    <div>
      <Header />
      <StyledContaineur>
        <StyledH1>Quel est votre objectif ? </StyledH1>
        <StyledInput
          type="text"
          placeholder="écrivez ici"
          onChange={handleInput}
          value={name}
          id="new-todo-input"
          autoComplete="off"
        />
        <StyledContainerDaysButton>
          {weekdays.map((day) => (
            <StyledDaysButton onClick={() => handleDayClick(day)} key={day}>
              {day.format('ddd')}
            </StyledDaysButton>
          ))}
        </StyledContainerDaysButton>

        <Link to="/">
          <Button onClick={saveData}>VALIDER</Button>
        </Link>
      </StyledContaineur>
    </div>
  )
}

export default AddHabitTwo
