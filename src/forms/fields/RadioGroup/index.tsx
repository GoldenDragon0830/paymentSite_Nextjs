'use client'

import React, { useId } from 'react'

import Error from '../../Error'
import Label from '../../Label'
import { Validate } from '../../types'
import { FieldProps } from '../types'
import { useField } from '../useField'

import classes from './index.module.scss'

export type Option = {
  label: string | React.ReactElement
  value: string
}

const defaultValidate: Validate = val => {
  const isValid = Boolean(val)

  if (isValid) return true

  return 'Please make a selection.'
}

const RadioGroup: React.FC<
  FieldProps<string> & {
    options: Option[]
    layout?: 'vertical' | 'horizontal'
    hidden?: boolean
  }
> = props => {
  const {
    path,
    required = false,
    validate = defaultValidate,
    label,
    options,
    onChange: onChangeFromProps,
    initialValue,
    layout,
    hidden,
    onClick,
  } = props

  const id = useId()

  const { onChange, value, showError, errorMessage } = useField<string>({
    initialValue,
    onChange: onChangeFromProps,
    path,
    validate,
    required,
  })

  return (
    <div
      className={[classes.wrap, layout && classes[`layout--${layout}`]].filter(Boolean).join(' ')}
    >
      <Error showError={showError} message={errorMessage} />
      <Label htmlFor={path} label={label} required={required} />
      <ul className={classes.ul}>
        {options.map((option, index) => {
          const isSelected = String(option.value) === String(value)
          const optionId = `${id}-${index}`

          return (
            <li key={index} className={classes.li}>
              <label htmlFor={optionId} className={classes.radioWrap} onClick={onClick}>
                <input
                  id={optionId}
                  type="radio"
                  checked={isSelected}
                  onChange={() => {
                    onChange(option.value)
                  }}
                />
                <span
                  className={[
                    classes.radio,
                    isSelected && classes.selected,
                    hidden && classes.hidden,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
                <span className={classes.label}>{option.label}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RadioGroup
