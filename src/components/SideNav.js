import React from 'react';
import { useStore } from '../store';

const SideNav = () => {
  const [
    { topics, cards, currentCardIdx, topicsChanged },
    dispatch
  ] = useStore();

  //form methods
  const formCallback = props => {
    const { action, params } = props;
    switch (action) {
      case 'Add New Topic':
        addNewTopic(params[0]);
        break;
      default:
        //setActiveForm('');
        break;
    }
  };

  const openForm = type => {
    //setActiveForm('New Topic');
  };

  //topic methods
  const getTopics = () => {
    return topics.map((topic, idx) => (
      <option key={`t_${idx}`}>{topic}</option>
    ));
  };

  const topicChange = evt => {
    const elem = evt.currentTarget;
    const elemValue = elem.options[elem.selectedIndex].value;
    //setCurrentTopic(elemValue);
  };

  const addNewTopic = newValue => {
    //setActiveForm('');
    if (topics.indexOf(newValue) === -1) {
      //settopics(topics.concat([newValue]));
      //setTpcsChanged(true);
    }
  };

  //file saving methods
  const saveTpcChanges = () => {
    const newData = JSON.stringify({ topics: topics, cards }, null, 2);
    //fs.writeFileSync('./data/QnA.json', newData);
    //setTpcsChanged(false);
  };

  const saveCardChanges = newCards => {
    const newData = JSON.stringify({ topics, cards: newCards }, null, 2);
    //fs.writeFileSync('./data/QnA.json', newData);
  };

  //side nav methods
  const getSideNavTopics = () => {
    return topics.map((topic, idx) =>
      idx > 0 ? (
        <li key={`tpc_${idx}`} className='sideNav__topic'>
          <span className='sideNav__tpcToggle'>&nbsp;</span>
          {topic}
          <ul>{getSideNavCards(topic)}</ul>
        </li>
      ) : null
    );
  };

  const getSideNavCards = topic => {
    return cards.map((card, idx) =>
      card.topic === topic ? (
        <li
          key={`c_${card.id}`}
          className={`sideNav__card${
            idx === currentCardIdx ? ' sideNav__currentCard' : ''
          }`}
          //          onClick={() => setCurrentCardIdx(idx)}
        >
          {`Card ${card.id}`}
        </li>
      ) : null
    );
  };
  return (
    <nav className='sideNav'>
      <select
        id='topicsSelect'
        className='topicsSelect'
        onChange={evt => topicChange(evt)}
      >
        {getTopics()}
      </select>
      <button className='sideNav__button' onClick={() => openForm('New Topic')}>
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
