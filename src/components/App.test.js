import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducers from '../reducers';

test('renders title', () => {
  let store = createStore(reducers);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const loadingElement = screen.getByText(/Loading data.../i);
  expect(loadingElement).toBeInTheDocument();
});
