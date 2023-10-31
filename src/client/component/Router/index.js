import React from 'react';
import '~/client/style/index.css';
import style from './index.module.css';
import UpdateConfirm from '~/client/script/component/UpdateConfirm';
import NotFound from '~/client/script/page/NotFound';
import WebApp from '~/client/script/component/WebApp';

class Router extends WebApp {
  constructor(props) {
    super(props);
    this.route =  {};
    this.component = {};
    this.state = {
      loading: true,
      location: '/',
    };
  }

  async componentDidMount() {
    await this.bindEvent();
    emitter.send('page' + window.location.pathname);
  }

  bindEvent() {
    location.onChange((location) => {
      this.setState({
        location,
        loading: false,
      });
    });
    emitter.on('page/', async () => {
      const Home = await import('~/client/script/page/Home');
      this.addRoute('/', Home.default);
      location.to('/');
    });
    emitter.on('page/login', async () => {
      const LoginOrSignIn = await import('~/client/script/page/LoginOrSignIn');
      this.addRoute('/login', LoginOrSignIn.default);
      location.to('/login');
    });
    emitter.on('page/upload', async () => {
      const Upload = await import('~/client/script/page/Upload');
      this.addRoute('/upload', Upload.default);
      location.to('/upload');
    });
    emitter.on('page/mustknown', async () => {
      const MustKnown = await import('~/client/script/page/MustKnown');
      this.addRoute('/mustknown', MustKnown.default);
      location.to('/mustknown');
    });
    emitter.on('page/user', async () => {
      const User = await import('~/client/script/page/User');
      this.addRoute('/user', User.default);
      location.to('/user');
    });
    emitter.on('page/findBackPassword', async () => {
      const FindBackPassword = await import('~/client/script/page/FindBackPassword');
      this.addRoute('/findBackPassword', FindBackPassword.default);
      location.to('/findBackPassword');
    });
    emitter.on('page/readme', async (name, version) => {
      const Readme = await import('~/client/script/page/Readme');
      this.addRoute('/readme', Readme.default);
      location.to('/readme');
    });
  }

  addRoute(path, component) {
    const { route, } = this;
    if (route[path] === undefined) {
      route[path] = component;
    }
    return route[path];
  }

  getPage(path) {
    const { component, } = this;
    if (component[path] === undefined) {
      const Page = this.route[path];
      if (Page === undefined) {
        return <NotFound />;
      }
      if (Page) {
        component[path] = <Page />;
      } else {
        component[path] = null;
      }
    }
    return component[path];
  }

  render() {
    const { location, minize, update, loading, } = this.state;
    let router;
    if (loading === true) {
      router = null;
    } else {
      router = <div id="page" className={style.page}>{this.getPage(location)}</div>;
    }
    return router;
  }
}

export default Router;
