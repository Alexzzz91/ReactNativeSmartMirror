/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { SettingsComponents } from '../../common/Settings';
import { translate } from '../../i18n';
import { changeFullscreenMode } from '../../reducers/common';

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.styles = getStyles();
  }

  handleResizeClick = () => {
    const { changeFScreenMode, fullscreenMode } = this.props;

    changeFScreenMode();
    if (fullscreenMode) {
      cancelFullscreen();
    } else {
      launchFullScreen();
    }
  }

  render() {
    const { styles } = this;
    const { locale, fullscreenMode } = this.props;

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
                { translate('Back', locale) }
              </Link>
            </div>
            <div
              style={{ ...styles.resizeButton }}
              onClick={this.handleResizeClick}
            >
              { translate(
                fullscreenMode ? 'InWindow' : 'FullScreen',
                locale,
              )}
              <span
                className="iconify"
                data-icon={fullscreenMode ? 'fe:compress' : 'fe:expand'}
                data-inline="false"
                width="2em"
                height="2em"
                style={{ ...styles.iconResize }}
              />
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

const mapStateToProps = state => ({
  locale: state.common.locale,
  fullscreenMode: state.common.fullscreenMode,
});

const mapDispatchToProps = dispatch => ({
  changeFScreenMode: () => dispatch(changeFullscreenMode()),
});

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

export {
  ConnectedSettings as default,
  ConnectedSettings as Settings,
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
    justifyContent: 'space-between',
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
    width: '140px',
    height: '20px',
    textAlign: 'left',
    marginLeft: 16,
    marginTop: 6,
  },
  resizeButton: {
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    padding: '1px 15px',
    border: '1px white solid',
    cursor: 'pointer',
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
  iconResize: {
    marginLeft: 6,
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
    borderRadius: '2px',
    backgroundColor: 'rgba(1, 1, 1, 0.8)',
    boxShadow: 'black 0px 0px 8px 10px, white 0px 0px 3px 6px',
  },
});


function launchFullScreen() {
  const element = document.documentElement;
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

// Выход из полноэкранного режима
function cancelFullscreen() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}
