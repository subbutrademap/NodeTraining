import React from 'react';
import AppRoutes from './AppRoutes';
import { AppContextProvider } from './Day6/Store/AppContextProvider';
const App = () => (
  <AppContextProvider>
    <AppRoutes />
  </AppContextProvider>

);

export default App;
