import './App.css';
import store from './pages/at_store/store'
import { Provider } from 'react-redux';
import Home  from './pages/at_home/home';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
