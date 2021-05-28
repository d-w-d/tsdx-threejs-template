import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';

import { TsdxThreejsTemplate } from '..';

const App = () => {
  // --------------->>>

  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <>
      <h1>Create-React-App Example</h1>
      <div
        onClick={() => setIsVisible(previous => !previous)}
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#282c34',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {isVisible ? (
          <div
            style={{ width: 500, height: 500, border: 'white 1px solid' }}
            onClick={e => {
              //
              e.stopPropagation();
            }}
          >
            <TsdxThreejsTemplate backgroundColor="none" />
          </div>
        ) : (
          <div>Not visible</div>
        )}
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
