import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import FeeInputForm from './FeeInputForm';

function FeeInputPage() {
  return (
    <Provider store={store}>
      <div style={{ width: '80%', margin: '2.6rem auto 0', height:'45rem', padding:'3rem', minWidth:'450px'}}>
        <FeeInputForm />
      </div>
    </Provider>
  );
};

export default FeeInputPage;