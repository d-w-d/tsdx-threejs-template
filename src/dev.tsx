import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';

import { TsdxThreejsTemplate } from '.';

ReactDOM.render(
  <div
    style={{
      //
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <TsdxThreejsTemplate width={500} height={500} backgroundColor="black" />
  </div>,
  document.getElementById('root')
);
