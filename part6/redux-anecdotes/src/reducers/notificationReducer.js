import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotification(state,action){
      const content = action.payload
      return content
    }
  }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer