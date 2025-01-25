const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newState = {...state }
      newState.good = newState.good +1
      return newState
    case 'OK':
      const newOkState = {...state }
      newOkState.ok = newOkState.ok +1
      return newOkState
    case 'BAD':
      const newBadState = {...state}
      newBadState.bad = newBadState.bad + 1
      return newBadState
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
