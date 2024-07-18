import React from 'react'
import classes from './Button.module.css'
import { Link, LinkProps } from 'react-router-dom'

type BaseButtonProps = {
  children?: React.ReactNode
  bgColor?: string
  textSize?: string
  size?: string
  border?: boolean
  link?: boolean
}

type ButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

// type OptionalLinkProps = Omit<LinkProps, 'to'> & Partial<Pick<LinkProps, 'to'>>;
// type LinkButtonProps = BaseButtonProps & OptionalLinkProps;

type LinkButtonProps = BaseButtonProps & LinkProps;

export type ButtonType = ButtonProps | LinkButtonProps;

const Button = ({
  children = null,
  bgColor = 'transparent',
  textSize = 'normal',
  size = 'normal',
  border = false,
  link = false,
  ...extraProps
}: ButtonType) => {
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
        {...extraProps as LinkButtonProps}
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
        {...extraProps as ButtonProps}
      >
        {children}
      </button>
      )
}

export default Button
