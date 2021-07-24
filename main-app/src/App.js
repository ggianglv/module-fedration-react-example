import React from 'react';
import './App.css';

const RemoteComponent = React.lazy(
  () => import('remote_app/RemoteComponent'),
);

const App = () => (
  <div className="App">
    App

    <React.Suspense fallback="Loading remote">
      <RemoteComponent />
    </React.Suspense>
  </div>
);
export default App;
