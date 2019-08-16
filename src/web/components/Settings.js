import React from 'react';
import { Link } from 'react-router-dom';
import { SettingsComponents } from '../../common/Settings';

class Settings extends React.PureComponent {
  render(){
    const { locale, setLocale } = this.props;

    return (
      <div style={{...styles.container}}>
        <div style={{...styles.topRow}}>
          <div style={{...styles.settingsButtonView}}>
            <Link
              style={{...styles.settingsButton}}
              to='/'
            >
              <span
                className="iconify"
                data-icon="simple-line-icons:arrow-left"
                data-inline="false"
                style={{...styles.iconBack}}
              />
              Вернуться обратно
            </Link>
          </div>
        </div>
        {
          Object.keys(SettingsComponents.asyncComponents)
          .map((cKey) => {
            let component = SettingsComponents.asyncComponents[cKey];
            component = React.createElement(component);
            return (
              <React.Fragment key={cKey}>
                {component}
              </React.Fragment>
            );
          })
        }
      </div>
    );
  };
};

export {
  Settings
};

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#232323e6',
    padding: '2px',
  },
  settingsLocales: {
    color: 'white',
    fontSize: '24',
  },
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
  iconBack: {
    marginRight: 6,
  }
};
