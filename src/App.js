import React, { useState } from 'react';
// import HooksPage from './pages/HooksPage';
// import ReduxPage from './pages/ReduxPage';
import ReactReduxPage from './pages/ReactReduxPage';

function App() {
  // const [cnt, setState] = useState(0)
  return (
    <div className="App">
      {/* <HooksPage /> */}
      {/* <button onClick={() => setState(cnt + 1)}>{"app" + cnt}</button> */}
      {/* <ReactReduxPage cnt={cnt} /> */}
      <ReactReduxPage />
      {/* <ReduxPage /> */}
    </div>
  );
}

export default App;
