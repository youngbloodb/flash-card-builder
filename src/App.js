import React, { useState } from 'react';
import NewTopicForm from './NewTopicForm';
const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer = electron.ipcRenderer;

function App() {
  //initial data import
  const rawdata = fs.readFileSync('./data/QnA.json'); //@TODO: add error handling and file lookup
  const { topics, cards } = JSON.parse(rawdata);

  //state hooks
  const [userTopics, setUserTopics] = useState(topics);
  const [currentTopic, setCurrentTopic] = useState(topics[0]);
  const [activeForm, setActiveForm] = useState('');

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
    }
  };

  //file saving methods
  const saveChanges = () => {
    const newData = JSON.stringify({ topics: userTopics, cards }, null, 2);
    fs.writeFileSync('./data/QnA.json', newData);
  };

  return (
    <div className='App'>
      <NewTopicForm
        isActiveForm={activeForm === 'New Topic'}
        parentCallback={formCallback}
      />
      <h1>Flash Card Builder</h1>
      <h2>Select a topic from the list below:</h2>
      <select className='topicsSelect' onChange={evt => topicChange(evt)}>
        {getTopics()}
      </select>
      <input
        type='button'
        className='addTopicsBtn'
        value='Add Topic'
        onClick={() => openForm('New Topic')}
      ></input>
      <br></br>
      <button onClick={saveChanges}>Save Changes</button>
    </div>
  );
}

export default App;
