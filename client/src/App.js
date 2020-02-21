import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Paths from './routes/paths';
function App() {
  return (
    <BrowserRouter>
      <Paths />
    </BrowserRouter>
  );
}

export default App;
