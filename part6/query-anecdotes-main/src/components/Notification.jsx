import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const [message, notificationDispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  
  if ( message === '') {
    return null
  } else {
    console.log({message})
    return (
      <div style={style}>
        {message}
      </div>
    )
  }

}

export default Notification
