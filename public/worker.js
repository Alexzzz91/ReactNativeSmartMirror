postMessage("I\'m working before postMessage(\'ali\').");

onmessage = function (oEvent) {
  postMessage("Hi " + oEvent.data);
  fetch("https://calendar.google.com/calendar/ical/belalex.9132788%40gmail.com/public/basic.ics", {
    mode: 'no-cors',
    headers: {
      "Content-Type": "text/calendar; charset=UTF-8"
    },
  })
    .then((response) => {
      console.log('response', response);
      this.setState({fetching: true});
      response.text().then((text) => {
        console.log('text', text);
      })
    })
    .catch(e => console.error(e))
};
