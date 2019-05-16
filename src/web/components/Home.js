import React from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import { TextClock } from './TextClock';
import { ModuleClock } from './ModuleClock';
import { ModuleCalendarEvents } from './ModuleCalendarEvents';

class About extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTextTime: false,
    };
  }

  render(){

    const { showTextTime } = this.state;

    const showModuleClock = true;
    const showModuleCalendarEvents = true;

    return (
      <div className="region--global">
          <div className="region top bar">
            <div className="region top left">
              <div className="container" style={{display: 'block'}}>
                { showModuleClock &&
                  <ModuleClock/>
                }
                { showModuleCalendarEvents &&
                   <ModuleCalendarEvents/>
                }
              </div>
            </div>
            <div className="region top center">
              <div className="container" style={{display: 'none'}} />
            </div>
            <div className="region top right">
              <div className="container" style={{display: 'block'}}>
                <div id="module_5_currentweather" className="module currentweather currentweather" style={{transition: 'opacity 0.5s ease 0s', opacity: 1, position: 'static'}}>
                  <div className="module-content">
                    <div>
                      <div className="large light"><span className="wi weathericon wi-rain" /><span className="bright"> 18°</span></div>
                    </div>
                  </div>
                </div>
                <div id="module_6_weatherforecast" className="module weatherforecast weatherforecast" style={{transition: 'opacity 0.5s ease 0s', opacity: 1, position: 'static'}}>
                  <header className="module-header">Прогноз в Moscow, RU</header>
                  <div className="module-content">
                    <table className="small">
                      <tbody><tr className="colored">
                          <td className="day">вт</td>
                          <td className="bright weather-icon"><span className="wi weathericon wi-rain" /></td>
                          <td className="align-right bright max-temp">18°</td>
                          <td className="align-right min-temp">11°</td>
                        </tr>
                        <tr className="colored">
                          <td className="day">ср</td>
                          <td className="bright weather-icon"><span className="wi weathericon wi-rain" /></td>
                          <td className="align-right bright max-temp">14°</td>
                          <td className="align-right min-temp">6°</td>
                        </tr>
                        <tr className="colored" style={{opacity: '0.8'}}>
                          <td className="day">чт</td>
                          <td className="bright weather-icon"><span className="wi weathericon wi-day-cloudy" /></td>
                          <td className="align-right bright max-temp">10°</td>
                          <td className="align-right min-temp">1°</td>
                        </tr>
                        <tr className="colored" style={{opacity: '0.533333'}}>
                          <td className="day">пт</td>
                          <td className="bright weather-icon"><span className="wi weathericon wi-snow" /></td>
                          <td className="align-right bright max-temp">4°</td>
                          <td className="align-right min-temp">2°</td>
                        </tr>
                        <tr className="colored" style={{opacity: '0.266667'}}>
                          <td className="day">сб</td>
                          <td className="bright weather-icon"><span className="wi weathericon wi-day-sunny" /></td>
                          <td className="align-right bright max-temp">8°</td>
                          <td className="align-right min-temp">1°</td>
                        </tr>
                      </tbody></table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="region upper third">
            <div className="container" style={{display: 'none'}} />
          </div>
          <div
            className="region middle third"
            onClick={() => this.setState({showTextTime: !showTextTime})}
          >
            { showTextTime
              ? (
                <TextClock/>
              ) : (
                <div className="container" style={{display: 'block'}}>
                  <br />
                  <div id="module_4_compliments" className="module compliments compliments">
                    <div className="module-content">
                      <div className="thin xlarge bright pre-line">Дома уберись, что ли</div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <div className="region bottom bar">
            <div className="container" style={{display: 'block'}}>
              <div id="module_8_newsfeed" className="module newsfeed newsfeed" style={{transition: 'opacity 2.5s ease 0s', opacity: 1, position: 'static'}}>
                <div className="module-content">
                  <div>
                    <div className="light small dimmed">Путешествия, 30 минут назад:</div>
                    <div className="bright medium light">Медведь лишил туристку руки</div>
                    <div className="small light">Медведь напал на пытавшуюся его покормить женщину в Амурской области. Инцидент произошел туристической базе. Женщина была доставлена в больницу в Благовещенск, где врачи ампутировали ей руку в связи с повреждением сосудистого русла. Региональное следственное управление СКР проводит проверку.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="region bottom left">
              <div className="container" style={{display: 'none'}} />
            </div>
            <div className="region bottom center">
              <div className="container" style={{display: 'none'}} />
            </div>
            <div className="region bottom right">
              <div className="container" style={{display: 'none'}} />
            </div>
          </div>
      </div>
    );
  };
};

export default About;
