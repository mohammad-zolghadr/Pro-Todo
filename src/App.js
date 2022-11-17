import React, { useEffect, useState } from 'react';

// SPA
import { Route, Routes, Navigate } from 'react-router-dom';

// Components
import BottomNav from './components/BottomNav';
import AddWork from './components/AddWork';
import WorkList from './components/WorkList';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Style
import style from './app.module.css';

// Local Storage

const App = () => {
  return (
    <Provider store={store}>
      <main>
        <BottomNav />
        <Routes>
          <Route path="/add-work" element={<AddWork />} />
          <Route path="/work-list" element={<WorkList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/*" element={<Navigate to="/not-found" />} />
        </Routes>
      </main>
    </Provider>
  );
};

export default App;
