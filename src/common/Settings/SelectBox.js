import React from 'react';
import Select from 'react-select';

const customStyles = {
  option: (provided, state) => {
    let color = state.isSelected ? '#8bf3fd' : 'white';

    if (state.value === 'off') {
      color = 'red';
    }

    return {
      ...provided,
      background: '#191919',
      color,
      padding: 10,
    };
  },
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: '100%',
    display: 'flex',
  }),
  singleValue: (provided) => {
    const opacity = 1;
    const color = 'white';
    const transition = 'opacity 300ms';

    return {
      ...provided,
      opacity,
      transition,
      color,
    };
  },
};

const SelectBox = (props) => {
  const { label } = props;

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
      <Select
        id={id}
        styles={customStyles}
        {...props}
      />
    </form>
  );
};


export {
  SelectBox as default,
  SelectBox,
};


const styles = {
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
};
