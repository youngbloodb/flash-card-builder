import React, { useState } from 'react';
import NewTopicForm from './NewTopicForm';
import Cards from './Cards';
const electron = window.require('electron');
const fs = electron.remote.require('fs');
//const ipcRenderer = electron.ipcRenderer;

function App() {
  //initial data import
  const rawdata = fs.readFileSync('./data/QnA.json'); //@TODO: add error handling and file lookup
  const { topics, cards } = JSON.parse(rawdata);

  //state hooks
  const [userTopics, setUserTopics] = useState(topics);
  const [currentTopic, setCurrentTopic] = useState(topics[0]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [activeForm, setActiveForm] = useState('');
  const [topicsChanged, setTpcsChanged] = useState(false);

  //form methods
  const formCallback = props => {
    const { action, params } = props;
    switch (action) {
      case 'Add New Topic':
        addNewTopic(params[0]);
        break;
      default:
        setActiveForm('');
        break;
    }
  };

  const openForm = type => {
    setActiveForm('New Topic');
  };

  //topic methods
  const getTopics = () => {
    return userTopics.map((topic, idx) => (
      <option key={`t_${idx}`}>{topic}</option>
    ));
  };

  const topicChange = evt => {
    const elem = evt.currentTarget;
    const elemValue = elem.options[elem.selectedIndex].value;
    setCurrentTopic(elemValue);
  };

  const addNewTopic = newValue => {
    setActiveForm('');
    if (userTopics.indexOf(newValue) === -1) {
      setUserTopics(userTopics.concat([newValue]));
      setTpcsChanged(true);
    }
  };

  //file saving methods
  const saveTpcChanges = () => {
    const newData = JSON.stringify({ topics: userTopics, cards }, null, 2);
    fs.writeFileSync('./data/QnA.json', newData);
    setTpcsChanged(false);
  };

  const saveCardChanges = newCards => {
    const newData = JSON.stringify({ topics, cards: newCards }, null, 2);
    fs.writeFileSync('./data/QnA.json', newData);
  };

  //side nav methods
  const getSideNavTopics = () => {
    return userTopics.map((topic, idx) =>
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
          onClick={() => setCurrentCardIdx(idx)}
        >
          {`Card ${card.id}`}
        </li>
      ) : null
    );
  };

  //side effects
  const topRef = React.createRef();

  /*
  <Cards
            topics={topics}
            currentTopic={currentTopic}
            cardsArray={cards}
            parentCallback={saveCardChanges}
            topRef={topRef}
          />
  */

  return (
    <div className='App'>
      <NewTopicForm
        isActiveForm={activeForm === 'New Topic'}
        parentCallback={formCallback}
      />
      <h1 ref={topRef} className='appName'>
        Flash Card Builder
      </h1>
      <section className='main'>
        <nav className='sideNav'>
          <select
            id='topicsSelect'
            className='topicsSelect'
            onChange={evt => topicChange(evt)}
          >
            {getTopics()}
          </select>
          <button
            className='sideNav__button'
            onClick={() => openForm('New Topic')}
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
        <article className='content'></article>
      </section>
    </div>
  );
}

export default App;
