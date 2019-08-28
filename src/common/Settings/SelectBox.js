import React from 'react';
import Select from 'react-select'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    background: '#191919',
    color: state.isSelected ? 'red' : 'white',
    padding: 10,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: '100%',
    display: 'flex',
  }),
  singleValue: (provided, state) => {
    const opacity = 1;
    const color = 'white';
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const SelectBox = (props) => (
  <Select
    styles={customStyles}
    {...props}
  />
);

export { SelectBox };
