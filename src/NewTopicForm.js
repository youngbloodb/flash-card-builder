import React from 'react';
import useInputForm from './CustomHooks';

const NewTopicForm = props => {
  const { isActiveForm, parentCallback } = props;

  const sendNewTopic = () => {
    if (inputs.newTopic !== undefined && inputs.newTopic !== '') {
      parentCallback({ action: 'Add New Topic', params: [inputs.newTopic] });
    }
  };

  const cancelInputs = () => {
    parentCallback({ action: 'Cancel' });
  };

  const { inputs, handleInputChange, handleSubmit } = useInputForm(
    sendNewTopic
  );

  return (
    <div className={isActiveForm ? 'overlay' : 'overlay overlay--disabled'}>
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
        <button type='reset' className='overlay__button' onClick={cancelInputs}>
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
