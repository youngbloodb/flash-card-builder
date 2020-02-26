import React from 'react';

import { useStore } from '../store';
import { setCurrentCard, setActiveForm, setTpcsChanged } from '../actions';

const SideNav = () => {
  const [
    { topics, cards, currentCardIdx, topicsChanged },
    dispatch,
  ] = useStore();

  const getTopics = () => {
    return topics.map((topic, idx) => (
      <option key={`t_${idx}`}>{topic}</option>
    ));
  };

  const topicChange = (evt) => {
    const elem = evt.currentTarget;
    const elemValue = elem.options[elem.selectedIndex].value;
    //setCurrentTopic(elemValue);
  };

  const saveTpcChanges = () => {
    const newData = JSON.stringify({ topics: topics, cards }, null, 2);
    //fs.writeFileSync('./data/QnA.json', newData);
    dispatch(setTpcsChanged(false));
  };

  const saveCardChanges = (newCards) => {
    const newData = JSON.stringify({ topics, cards: newCards }, null, 2);
    //fs.writeFileSync('./data/QnA.json', newData);
  };

  const getSideNavTopics = () => {
    return topics.map((topic, idx) =>
      idx > 0 ? (
        <li key={`tpc_${idx}`} className='sideNav__topic'>
          <span className='sideNav__tpcToggle'>&nbsp;</span>
          {topic}
          <ul>{getSideNavCards(topic)}</ul>
        </li>
      ) : null,
    );
  };

  const getSideNavCards = (topic) => {
    return cards.map((card, idx) =>
      card.topic === topic ? (
        <li
          key={`c_${card.id}`}
          className={`sideNav__card${
            idx === currentCardIdx ? ' sideNav__currentCard' : ''
          }`}
          onClick={() => dispatch(setCurrentCard(idx))}
        >
          {`Card ${card.id}`}
        </li>
      ) : null,
    );
  };

  return (
    <nav className='sideNav'>
      <select
        id='topicsSelect'
        className='topicsSelect'
        onChange={(evt) => topicChange(evt)}
      >
        {getTopics()}
      </select>
      <button
        className='sideNav__button'
        onClick={() => dispatch(setActiveForm('New Topic'))}
      >
        Add Topic
      </button>
      <button
        className='sideNav__button'
        onClick={saveTpcChanges}
        disabled={topicsChanged === false}
      >
        Save Changes
      </button>
      <div className='sideNav__cardsList'>
        <ul>{getSideNavTopics()}</ul>
      </div>
    </nav>
  );
};

export default SideNav;
