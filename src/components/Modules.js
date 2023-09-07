import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import './styles.css'

function CardList () {
  const [cards, setCards] = useState([])

  function handleAddCard () {
    const newCard = {
      name: '',
      date: '',
      confirmed: false,
      editable: true,
      titleSize: 'h5'
    }
    setCards([newCard, ...cards])
  }

  function handleConfirmClick (index) {
    const newCards = [...cards]
    const confirmedCard = newCards[index]
    confirmedCard.confirmed = true
    confirmedCard.editable = false
    confirmedCard.titleSize = 'h3'
    newCards.splice(index, 1)
    setCards([confirmedCard, ...newCards])
  }

  function handleEditClick (index) {
    const newCards = [...cards]
    const editableCard = newCards[index]
    editableCard.editable = true
    editableCard.confirmed = false
    editableCard.titleSize = 'h5'
    newCards.splice(index, 1)
    setCards([editableCard, ...newCards])
  }

  function handleInputChange (event, index, key) {
    const newCards = [...cards]
    newCards[index][key] = event.target.value
    if (key === 'date' && newCards[index].confirmed) {
      newCards[index].editable = false
    }
    setCards(newCards)
  }

  return (
    <div>
      <Button onClick={handleAddCard} className="add-card-btn" style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}>Add Module</Button >
      {cards.map((card, index) => (
        <Card key={index} className="my-3" style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title as={card.titleSize}>
              {!card.confirmed && <span>Module {index + 1}</span>}
              {card.confirmed && (
                <span>{card.name}</span>
              )}
            </Card.Title>
            {(!card.confirmed) && (
              <Card.Text>
                <input
                  type='text'
                  placeholder='Name'
                  value={card.name}
                  onChange={(event) => handleInputChange(event, index, 'name')}
                  disabled={!card.editable}
                />
                <input
                  type='date'
                  placeholder='Date'
                  value={card.date}
                  onChange={(event) => handleInputChange(event, index, 'date')}
                  disabled={!card.editable || card.confirmed}
                />

                <Button onClick={() => handleConfirmClick(index)}>Confirm</Button>
              </Card.Text>
            )}
            {(card.confirmed) && (
              <Card.Text>
                <Button onClick={() => handleEditClick(index)}>Edit</Button>
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default CardList
