import Router from '~/client/component/Router';
import UpdateConfirm from '~/client/component/UpdateConfirm';
import WebApp from '~/client/component/WebApp';
import clearCookie from '~/client/lib/clearCookie';
import readCookie from '~/client/lib/readCookie';
import setCookie from '~/client/lib/setCooke';

const client = {
  Router,
  UpdateConfirm,
  WebApp,
  clearCookie,
  readCookie,
  setCookie,
};

import CommonHttp from '~/server/client/class/CommonHttp';
import parseOption from '~/server/lib/parseOption';

const server = {
  CommonHttp,
  parseOption,
};

export { client, server, };
