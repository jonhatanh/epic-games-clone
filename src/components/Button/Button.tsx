import React from 'react'
import classes from './Button.module.css'
import { Link, LinkProps } from 'react-router-dom'

type ButtonProps = {
  children: React.ReactNode,
  bgColor?: string,
  textSize?: string,
  size?: string,
  border?: boolean,
  link?: boolean,
} & React.ButtonHTMLAttributes<HTMLButtonElement> & LinkProps
  

const Button = ({
  children,
  bgColor = 'transparent',
  textSize = 'normal',
  size = 'normal',
  border = false,
  link = false,
  ...extraProps
}: ButtonProps) => {
  bgColor = bgColor[0].toUpperCase() + bgColor.slice(1)
  textSize = textSize[0].toUpperCase() + textSize.slice(1)
  const sizeClass = size === 'large' ? classes.buttonLarge : ''
  return link
    ? (
      <Link
        className={`${classes.button} 
      ${classes['button' + bgColor]} 
      ${classes['buttonText' + textSize]}
      ${sizeClass}
      ${border ? classes.buttonBorder : ''}
      `}
        {...extraProps}
      >
        {children}
      </Link>
      )
    : (
      <button
        className={`${classes.button} 
      ${classes['button' + bgColor]} 
      ${classes['buttonText' + textSize]}
      ${sizeClass}
      ${border ? classes.buttonBorder : ''}
      `}
        {...extraProps}
      >
        {children}
      </button>
      )
}

export default Button
