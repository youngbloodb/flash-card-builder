import React, { useState, useEffect } from 'react';

const Cards = props => {
  const { topics, currentTopic, cardsArray, parentCallback } = props;
  const [cards, setCards] = useState([...cardsArray]);

  useEffect(() => {
    console.log('cards: ', cards);
  }, [cards]);

  const filteredCards =
    currentTopic === 'All topics'
      ? cards
      : cards.filter(card => card.topic === currentTopic);

  const getTopics = () => {
    return topics.map((topic, idx) => {
      return <option key={`t_${idx}`}>{topic}</option>;
    });
  };

  const submitCardChanges = evt => {
    //pass updated values to parent App
    evt.preventDefault();
    parentCallback(cards);
  };

  const resetCardChanges = cardID => {
    //get original value from cardsArray and setCards
    const card = cards.find(card => card.id === cardID);
    const idx = cards.indexOf(card);
    let tempCards = [...cards];
    tempCards[idx] = cardsArray[idx];
    setCards(tempCards);
  };

  const cardChange = params => {
    //change the appropriate value in the cards array
    const { id, type, value } = params;
    const card = cards.find(card => card.id === id);
    const idx = cards.indexOf(card);
    let tempCards = [...cards];
    tempCards[idx] = {
      id,
      question: type === 'Question Change' ? value : card.question,
      answer: type === 'Answer Change' ? value : card.answer,
      topic: type === 'Topic Change' ? value : card.topic
    };
    setCards(tempCards);
  };

  const getCardInputs = () => {
    return filteredCards.map(card => {
      return (
        <form
          id={`card_${card.id}`}
          key={`card_${card.id}`}
          className='card'
          onSubmit={submitCardChanges}
        >
          <h3>{`Card # ${card.id}`}</h3>
          <label>Topic:</label>
          <br />
          <select
            className='card__select'
            defaultValue={card.topic}
            onChange={evt =>
              cardChange({
                id: card.id,
                type: 'Topic Change',
                value: evt.currentTarget.value
              })
            }
          >
            {getTopics()}
          </select>
          <br />
          <label>Question</label>
          <br />
          <textarea
            placeholder={card.question}
            rows='5'
            className='card__textArea'
            onChange={evt =>
              cardChange({
                id: card.id,
                type: 'Question Change',
                value: evt.currentTarget.value
              })
            }
          ></textarea>
          <br />
          <label>Answer</label>
          <br />
          <textarea
            placeholder={card.answer}
            rows='5'
            className='card__textArea'
          ></textarea>
          <br />
          <input
            type='reset'
            value='Reset'
            onClick={() => resetCardChanges(card.id)}
            className='card__button'
            onChange={evt =>
              cardChange({
                id: card.id,
                type: 'Answer Change',
                value: evt.currentTarget.value
              })
            }
          />
          <input type='submit' value='Save Changes' className='card__button' />
        </form>
      );
    });
  };

  return <>{getCardInputs()}</>;
};

export default Cards;
