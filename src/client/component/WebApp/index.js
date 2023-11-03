import React from 'react';
import checkUpdate from '~/client/lib/checkUpdate';

const location = new Location();

class WebApp extends React.Component {
  constructor(props) {
    super(props);
    this.checkUpdate = this.checkUpdate.bind(this);
  }

  dealUpdate() {
    const id = setInterval(this.checkUpdate, 1000 * 60 * 30);
  }

  dealHistory() {
    window.addEventListener('popstate', (event) => {
      location.to(event.currentTarget.location.pathname);
    });
  }

  async checkUpdate() {
    const response = fetch('/update/time', {
      method: 'POST',
    });
    const time = await response.text();
    const update = parseInt(time) > new Date().getTime();
    this.setState({
      update,
    });
  }

  async componentDidMount() {
    this.dealUpdate();
    this.dealHistory();
  }

  async componentWillUnmount() {
    clearInterval(this.id);
  }
}

export default WebApp;
