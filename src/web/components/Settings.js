import React from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { SettingsComponents } from '../../common/Settings';

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.styles = getStyles();
  }

  render() {
    const { styles } = this;

    return (
      <Scrollbars
        style={{
          backgroundColor: 'rgba (1, 1, 1, 0.9)',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ ...styles.container }}>
          <div style={{ ...styles.topRow }}>
            <div style={{ ...styles.settingsButtonView }}>
              <Link
                style={{ ...styles.settingsButton }}
                to="/"
              >
                <span
                  className="iconify"
                  data-icon="simple-line-icons:arrow-left"
                  data-inline="false"
                  style={{ ...styles.iconBack }}
                />
                Вернуться обратно
              </Link>
            </div>
          </div>
          {Object.keys(SettingsComponents.asyncComponents)
            .map((cKey) => {
              let component = SettingsComponents.asyncComponents[cKey];
              component = React.createElement(component);
              return (
                <div
                  key={cKey}
                  style={{ ...styles.settingBlock }}
                >
                  {component}
                </div>
              );
            })
          }
        </div>
      </Scrollbars>
    );
  }
}

export {
  Settings as default,
  Settings,
};

const getStyles = params => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexFlow: 'row wrap',
    alignContent: 'space-between',
    backgroundColor: params && params.bg ? params.bg : 'rgba(1, 1, 1, 0.97)',
    padding: '8px',
    paddingBottom: '50px',
    minHeight: '100vh',
  },
  topRow: {
    width: '100%',
    display: 'flex',
    padding: '4px',
    alignContent: 'center',
    minHeight: '35px',
    borderRadius: '4px',
    marginBottom: '5%',
    boxShadow: '2px 4px 40px 50px black',
    backgroundColor: 'rgba(1, 1, 1, 0.8)',
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
  },
  settingBlock: {
    display: 'flex',
    flex: 1,
    minWidth: '48%',
    maxWidth: '48%',
    maxHeight: '500px',
    margin: '1%',
    marginBottom: '2%',
    padding: '4px 6px 25px 6px',
    boxSizing: 'border-box',
    border: '1px solid white',
    borderRadius: '2px',
    backgroundColor: 'rgba(1, 1, 1, 0.8)',
    boxShadow: 'black 0px 0px 10px 20px, white 0px 0px 6px 12px',
  },
});
