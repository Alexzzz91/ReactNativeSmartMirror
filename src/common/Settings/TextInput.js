import React from 'react';

const TextInpit = (props) => {
  const { label } = props;

  const selectBoxStyles = getStyles();

  const id = Math.round(Math.random() * 100);

  return (
    <form style={{ ...selectBoxStyles.form }}>
      {label && (
        <label
          style={{ ...selectBoxStyles.label }}
          htmlFor={id}
        >
          { label }
        </label>)
      }
      <input
        type="text"
        id={id}
        style={{ ...selectBoxStyles.input }}
        {...props}
      />
    </form>
  );
};


export {
  TextInpit as default,
  TextInpit,
};


const getStyles = () => ({
  form: {
    position: 'relative',
    border: '1px solid white',
    margin: '5px 0',
    padding: '1px',
  },
  label: {
    fontSize: '11px',
    position: 'absolute',
    top: '-5px',
    background: 'black',
    left: '5px',
  },
  input: {
    width: '100%',
    height: '100%',
    color: 'white',
    background: 'transparent',
    border: 'transparent',
    boxSizing: 'border-box',
    minHeight: '36px',
    padding: '0 5px',
  },
});
