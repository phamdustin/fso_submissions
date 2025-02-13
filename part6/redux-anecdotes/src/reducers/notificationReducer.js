import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    settingNotification(state,action){
      const content = action.payload
      return content
    },
    clearNotification(){
      return ''
    }
  }
})

export const { settingNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer