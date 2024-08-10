import React from 'react'


const Button = ({ onClick = () => {}, style = {}, icon = null, iconPosition= 'left', ...props}) => {
  return (
    <button onClick={onClick} style={{...buttonStyle, ...style}} {...props}>
        {icon && iconPosition === 'left' && <i className={icon} style={iconStyle}></i>}
        {props.children}
        {icon && iconPosition === 'right' && <i className={icon} style={{...iconStyle, marginRight: '0', marginLeft: '8px'}}></i>}
    </button>
  )
}

const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const iconStyle = {
    marginRight: '8px',
  };

export default Button