import React, { useState } from 'react';

import NewTopicForm from './NewTopicForm';
import Header from './Header';
import Content from './Content';
import SideNav from './SideNav';

function App() {
  return (
    <>
      <NewTopicForm />
      <Header />
      <section className='main'>
        <SideNav />
        <Content />
      </section>
    </>
  );
}

export default App;
