import React from 'react';
// import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { translate } from '../../i18n';
// import { useDebounce } from '../../common/debounce';

const SettingsButton = (props) => {
  // const [searchTerm, setSearchTerm] = useState('');

  // const [results, setResults] = useState([]);

  // const [isSearching, setIsSearching] = useState(false);

  // const myFunction = () => {
  //   console.log('q112123');
  // };

  // useEffect (() => {
  //   // eslint-disable-next-line no-undef
  //   window.document.addEventListener('mousemove', myFunction);
  // }, []);

  // useEffect(() => () => {
  //   window.document.removeEventListener('mousemove', myFunction);
  // }, []);

  // const debouncedButtonStyle = useDebounce(searchTerm, 50);

  // useEffect(
  //   () => {
  //     // Make sure we have a value (user has entered something in input)
  //     console.log('debouncedButtonStyle', debouncedButtonStyle);
  //     if (debouncedButtonStyle) {
  //       // Set isSearching state
  //       setIsSearching(true);
  //       // Fire off our API call
  //       console.log('23');
  //     } else {
  //       setResults([]);
  //     }
  //   },
  //   // This is the useEffect input array
  //   // Our useEffect function will only execute if this value changes ...
  //   // ... and thanks to our hook it will only change if the original ...
  //   // value (searchTerm) hasn't changed for more than 500ms.
  //   [debouncedButtonStyle]
  // );

  const styles = getStyles();
  const { locale } = props;

  return (
    <div style={{ ...styles.settingsButtonView }}>
      <Link
        style={{ ...styles.settingsButton }}
        to="/settings"
      >
        { translate('Settings', locale) }
      </Link>
    </div>
  );
};

export {
  SettingsButton as default,
  SettingsButton,
};

const getStyles = params => ({
  settingsButtonView: {
    width: '240px',
    height: '20px',
    textAlign: 'left',
    marginLeft: 16,
    marginTop: 6,
  },
  settingsButton: {
    color: 'white',
    textDecoration: 'none',
    padding: '5px 15px',
    border: '1px white solid',
  },
});
