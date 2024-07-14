import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import FeeInputForm from './FeeInputForm';

function FeeInputPage() {
  return (
    <Provider store={store}>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <FeeInputForm />
      </div>
    </Provider>
  );
};

export default FeeInputPage;