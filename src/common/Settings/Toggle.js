import React from 'react';

const Toggle = (props) => {
  const { label, value } = props;

  const styles = getStyles({ value });

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
      <div
        style={{ ...styles.toggle }}
      >
        <input
          style={{ ...styles.input }}
          type="checkbox"
          value={value}
          id={id}
          {...props}
        />
        <span style={{ ...styles.view }} />
      </div>
    </form>
  );
};


export {
  Toggle as default,
  Toggle,
};

const getStyles = ({ value }) => ({
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
  toggle: {
    position: 'relative',
    width: '45px',
    height: '24px',
    borderRadius: '40px',
    border: '1px solid',
    margin: '5px',
  },
  input: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    margin: '0px',
    cursor: 'pointer',
    opacity: '0',
    zIndex: '2',
  },
  view: {
    width: '22px',
    height: '22px',
    position: 'relative',
    display: 'block',
    background: 'white',
    borderRadius: '50%',
    left: '1px',
    top: '1px',
    transform: !value ? 'translateX(21px)' : 'translateX(0px)',
    transition: 'transform 0.5s ease 0s',
  },
});
