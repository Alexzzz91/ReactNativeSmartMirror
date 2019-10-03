import React from 'react';
import Select from 'react-select';

const getCustomStyles = styles => ({
  option: (provided, state) => {
    let color = state.isSelected ? '#8bf3fd' : 'white';

    if (!state.value) {
      color = 'red';
    }

    return {
      ...provided,
      background: '#191919',
      color,
      padding: 10,
      ...(styles && styles.option ? { ...styles.option() } : {}),
    };
  },
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: '100%',
    display: 'flex',
    ...(styles && styles.control ? { ...styles.control() } : {}),
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
      ...(styles && styles.singleValue ? { ...styles.singleValue() } : {}),
    };
  },
});

const SelectBox = (props) => {
  const { label, styles } = props;

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
      <Select
        id={id}
        styles={getCustomStyles(styles)}
        {...props}
      />
    </form>
  );
};


export {
  SelectBox as default,
  SelectBox,
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
});
