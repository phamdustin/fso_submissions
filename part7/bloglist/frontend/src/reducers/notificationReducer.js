import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    settingNotification(state,action){
      console.log('settingNotification function')
      console.log(`Content is ${action.payload}`)
      return action.payload
    },
    clearNotification(){
      return ''
    }
  }
})

export const { settingNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  // Message : Message to update the notification state to
  // Time : time in seconds to keep the message up.
  return async dispatch => {
    dispatch(settingNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
  }
}

export default notificationSlice.reducer