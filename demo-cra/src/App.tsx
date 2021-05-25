import React, { useState } from 'react';

import { TsdxThreejsTemplate } from 'tsdx-threejs-template';
import './App.css';

export function App() {
  // --------------->>>

  const [isVisible, setIsVisible] = useState(true);

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
          <div style={{ width: 350, height: 300 }}>
            <TsdxThreejsTemplate backgroundColor="green" />
          </div>
        ) : (
          <div>Not visible</div>
        )}
      </div>
    </>
  );
}

export default App;
