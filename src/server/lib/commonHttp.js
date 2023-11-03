import cacheOutput from '~/server/lib/cacheOutput';
import formateHttpKey from '~/server/lib/formateHttpKey';
import filterNamespace from '~/server/lib/filterNamespace';

function getFontsString(fonts) {
  return fonts.join('|');
}

class CommonHttp {
  constructor(options) {
    this.time = new Date().getTime();
    this.regexp = new RegExp(`\.(js|${getFontsString(options.fonts)}|html|ico)$`);
  }

  async process(req, res) {
    try {
      const { url, } = req;
      if (url === '/update/time') {
        const { time, } = this;
        res.end(time);
      } else if (this.regexp.test(url)) {
        cacheOutput(req, res, restPath,
          fs.readFileSync(path.resolve('static', restPath)),
          parseInt(fs.statSync(path.resolve('static', restPath)).mtimeMs),
        );
      } else if (url.substring(0, 4) === '/api') {
        const body = await new Promise((resolve, reject) => {
          req.on('data', (data) => {
            resolve(data.toString());
          });
        });
        const {
          location,
        } = options;
        const response = await fetch(location + url, {
          method: 'POST',
          body,
        });
        for (const k of response.headers.keys()) {
          res.setHeader(formateHttpKey(k), response.headers.get(k));
        }
        const response1 = response.clone();
        let data;
        try {
          data = await response.json();
        } catch (error) {
          data = await response1.text();
        }
        res.end(JSON.stringify(data));
      }
    } catch (e) {
      const {
        develope,
      } = options;
      if (develope === true) {
        throw e;
      } else {
        res.writeHead(500);
        res.end();
      }
    }
  }
}

export default CommonHttp;
