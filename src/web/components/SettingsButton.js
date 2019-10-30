
import React, { useEffect, useState } from 'react';
import jss from 'jss';

import { Link } from 'react-router-dom';
import { translate } from '../../i18n';
import { useDebounce } from '../../common/debounce';

let timeout;

const SettingsButton = (props) => {
  const [isShowing, setIsShowing] = useState(false);

  const debouncedShowing = useDebounce(isShowing, 1000);

  const myFunction = () => {
    setIsShowing(true);
    timeout = setTimeout(() => {
      if (debouncedShowing) {
        setIsShowing(false);
      }
    }, 5000);
    if (debouncedShowing) {
      setIsShowing(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', myFunction);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', myFunction);
    };
  }, [debouncedShowing]);

  const styles = getStyles({ showing: debouncedShowing });
  const { classes } = jss.createStyleSheet(styles).attach();
  const { locale } = props;

  return (
    <div className={classes.settingsButtonView}>
      <Link
        className={classes.settingsButton}
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

const getStyles = ({ showing }) => ({
  settingsButtonView: {
    width: '240px',
    height: '20px',
    'text-align': 'left',
    'margin-left': '16px',
    'margin-top': '6px',
    opacity: showing ? '1' : '0.1',
    transition: 'opacity 1s ease-out 0.5s',
  },
  settingsButton: {
    color: 'white',
    'text-decoration': 'none',
    padding: '5px 15px',
    border: '1px white solid',
  },
});
