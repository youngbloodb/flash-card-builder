import React from 'react';
import useInputForm from './CustomHooks';

import { useStore } from '../store';
import { setActiveForm, addTopic, setTpcsChanged } from '../actions';

const NewTopicForm = () => {
  const [{ activeForm }, dispatch] = useStore();

  const sendNewTopic = () => {
    if (inputs.newTopic !== undefined && inputs.newTopic !== '') {
      dispatch(addTopic(inputs.newTopic));
      dispatch(setTpcsChanged(true));
      dispatch(setActiveForm(''));
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useInputForm(
    sendNewTopic,
  );

  return (
    <div
      className={
        activeForm === 'New Topic' ? 'overlay' : 'overlay overlay--disabled'
      }
    >
      <form
        onSubmit={handleSubmit}
        key='newTopicForm'
        className='overlay__form'
      >
        <label>New topic name:</label>
        <input
          type='text'
          className='newTpcInput'
          name='newTopic'
          value={inputs.newTopic || ''}
          onChange={handleInputChange}
        ></input>
        <button
          type='reset'
          className='overlay__button'
          onClick={() => dispatch(setActiveForm(''))}
        >
          Cancel
        </button>
        <button type='submit' className='overlay__button'>
          Submit
        </button>
      </form>
    </div>
  );
};
export default NewTopicForm;
