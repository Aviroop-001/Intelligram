import { store } from './Redux/Store'
import { Provider } from 'react-redux'
import Index from './Index';

export default function App() {
  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  );
}
