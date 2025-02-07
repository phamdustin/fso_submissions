export const changeFilter = (content) => {
  return {
    type: 'UPDATE',
    payload: content
  }
}

const filterReducer = (state='',action) => {
  switch(action.type) {
    case 'UPDATE': {
      return action.payload
    }
    default:
      return state
  }

}

export default filterReducer