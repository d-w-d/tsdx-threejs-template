import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';

import { TsdxThreejsTemplate } from '../dist';

const App = () => {
  return (
    <div className={''}>
      <h1>Demo from parcelled react</h1>
      <TsdxThreejsTemplate />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
