import React from 'react';

const Button = (props) => {
  const {
    children,
    disabled = false,
  } = props;

  const styles = getStyles({ disabled });

  return (
    <button
      type="button"
      style={{ ...styles.button }}
      {...props}
    >
      { children }
    </button>
  );
};


export {
  Button as default,
  Button,
};


const getStyles = ({ disabled }) => ({
  button: {
    position: 'relative',
    border: '1px solid white',
    margin: '5px 0',
    padding: '1px',
    width: '100%',
    minHeight: '36px',
    background: 'transparent',
    borderRadius: '3px',
    color: 'white',
    cursor: disabled ? 'not-allowed' : 'pointer',
  },
});
