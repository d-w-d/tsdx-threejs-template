import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';

import { TsdxThreejsTemplate } from '.';

ReactDOM.render(
  <div style={{ width: 500, height: 500, backgroundColor: 'green' }}>
    <TsdxThreejsTemplate />
  </div>,

  document.getElementById('root')
);
