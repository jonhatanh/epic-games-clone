import PropTypes from 'prop-types'
import classes from './Button.module.css'

const Button = ({
  children,
  bgColor = 'transparent',
  textSize = 'normal',
  size = 'normal',
  border = false,
  ...extraProps
}) => {
  bgColor = bgColor[0].toUpperCase() + bgColor.slice(1)
  textSize = textSize[0].toUpperCase() + textSize.slice(1)
  const sizeClass = size === 'large' ? classes.buttonLarge : ''
  return (
    <button
      className={`${classes.button} 
      ${classes['button' + bgColor]} 
      ${classes['buttonText' + textSize]}
      ${sizeClass}
      ${border && classes.buttonBorder}
      `}
      {...extraProps}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.oneOf(['transparent', 'white', 'blue', 'gray']),
  textSize: PropTypes.oneOf(['small', 'normal', 'large']),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  border: PropTypes.bool
}

export default Button
