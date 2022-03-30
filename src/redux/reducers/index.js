// combineReducers come from redux that used for combining reducers that we just made.
import { combineReducers } from 'redux'

// Reducers
import reducer from './task-reducer'

const rootReducer =  combineReducers({
 reducer
  // Here you can registering another reducers.
})

export default rootReducer