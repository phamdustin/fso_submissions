import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  return action.payload
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, notificationDispatch] = useReducer(notificationReducer, '')
  return (
    <NotificationContext.Provider value={[message, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext