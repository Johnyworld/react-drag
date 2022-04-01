import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CardsProvider from './features/cards/cards.provider';
import ListPage from './pages/ListPage';
import routes from './routes';

function App() {
  return (
    <div className='App'>
      <CardsProvider>
        <HashRouter>
          <Header />
          <Routes>
            <Route path='/' element={<ListPage />} />
            {routes.map(data => (
              <Route key={data.id} path={data.path} element={<data.component />} />
            ))}
          </Routes>
        </HashRouter>
      </CardsProvider>
    </div>
  );
}

export default App;
