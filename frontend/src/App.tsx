import HomePage from './pages/HomePage';
import NewRecord from './pages/NewRecord';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import { store } from './store';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <PrimeReactProvider value={{ unstyled: false }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='new' element={<NewRecord />} />
            <Route path="user/:id" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </PrimeReactProvider>
  );
}

export default App;
