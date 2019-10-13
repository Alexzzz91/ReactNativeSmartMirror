import React from 'react';

const TextArea = (props) => {
  const { label } = props;

  const styles = getStyles();

  const id = Math.round(Math.random() * 100);

  return (
    <form style={{ ...styles.form }}>
      {label && (
        <label
          style={{ ...styles.label }}
          htmlFor={id}
        >
          { label }
        </label>)
      }
      <textarea
        id={id}
        style={{ ...styles.textarea }}
        {...props}
      />
    </form>
  );
};


export {
  TextArea as default,
  TextArea,
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
  textarea: {
    width: '100%',
    height: '100%',
  },
});
