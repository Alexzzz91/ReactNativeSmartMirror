import React from 'react';

class ModuleCalendarEvents extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sign: false,
      signedIn: false,
      name: null,
      photoUrl: null,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.signUpdate = this.signUpdate.bind(this);
  }

  signUpdate(sign) {
    console.log('sign', sign);
    this.setState({
      sign: sign
    });
  }

  handleItemClick(event, name) {
    if (name === 'sign-in') {
      this.signIn();
    } else if (name === 'sign-out') {
      alert('kek');
    }
  }

  signIn = async () => {

  }

  render() {
    // if (ApiCalendar.sign) {
    //   ApiCalendar.listUpcomingEvents(10)
    //     .then(({result}) => {
    //       console.log('result', result);
    //     });
    // }

    return (
        <div className="module calendar calendar" style={{transition: 'opacity 1s ease 0s', opacity: 1, position: 'static'}}>
          <button
              onClick={(e) => this.handleItemClick(e, 'sign-in')}
          >
            sign-in
          </button>
          <button
              onClick={(e) => this.handleItemClick(e, 'sign-out')}
          >
            sign-out
          </button>

          <header className="module-header">События</header>
          <div className="module-content">
            <table className="small">
              <tbody>
              <tr className="normal">
                  <td className="symbol align-right "><span className="fa fa-fw fa-calendar" /></td>
                  <td className="title bright ">Тренажёрка</td>
                  <td className="time light ">Через 5 часов</td>
                </tr>
                <tr className="normal">
                  <td className="symbol align-right "><span className="fa fa-fw fa-calendar" /></td>
                  <td className="title bright ">Стоматолог</td>
                  <td className="time light ">Завтра в 12:00</td>
                </tr>
                <tr className="normal" style={{opacity: '0.8'}}>
                  <td className="symbol align-right "><span className="fa fa-fw fa-calendar" /></td>
                  <td className="title bright ">Россети</td>
                  <td className="time light ">В четверг в 15:00</td>
                </tr>
                <tr className="normal" style={{opacity: '0.533333'}}>
                  <td className="symbol align-right "><span className="fa fa-fw fa-calendar" /></td>
                  <td className="title bright ">Вика заберёт кальян</td>
                  <td className="time light ">Через 2 дня</td>
                </tr>
                <tr className="normal" style={{opacity: '0.266667'}}>
                  <td className="symbol align-right "><span className="fa fa-fw fa-calendar" /></td>
                  <td className="title bright ">ДР Полины Сафоновой</td>
                  <td className="time light ">Через 4 дня</td>
                </tr>
              </tbody></table>
          </div>
        </div>
    );
  }
};

export {
  ModuleCalendarEvents
};
