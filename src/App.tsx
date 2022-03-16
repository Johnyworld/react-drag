import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CardGridContainer from './features/cardGrid/cardGrid.container';
import CardListContainer from './features/cardList/cardList.container';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<CardListContainer />} />
            <Route path='/grid' element={<CardGridContainer />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
