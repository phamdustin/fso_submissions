import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './services/store'
/* import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'


const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer
  }
}) */

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)