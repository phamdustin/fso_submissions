import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    console.log("useField reset")
    setValue('')
  }

  return {
    type,
    value,
    reset,
    onChange
  }
}