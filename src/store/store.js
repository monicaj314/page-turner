import { createStore } from 'redux'
import ReduxApp from '../reducers'

import { addBook, toggleBooks } from '../actions'


let store = createStore(ReduxApp);

export function testStore(){
  // Log the initial state
  console.log('Initial: ', store.getState())

  // Every time the state changes, log it
  // Note that subscribe() returns a function for unregistering the listener
  let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
  )

  // Dispatch some actions
  store.dispatch(addBook())
  store.dispatch(toggleBooks())

  // Stop listening to state updates
  unsubscribe()
}
