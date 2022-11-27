import { ChangeEvent, InputHTMLAttributes } from 'react'

import styles from './Checkbox.module.css'

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (checked: boolean) => void
}

export function Checkbox({ onChange, ...props }: CheckboxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    if (onChange) onChange(isChecked)
  }

  return (
    <input
      {...props}
      type="checkbox"
      onChange={handleChange}
      className={styles.checkbox}
    />
  )
}
