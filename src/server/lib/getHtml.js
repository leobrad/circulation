import handlebars from 'handlebars';
import { minify, } from 'html-minifier';

let html;

export default function getHtml(title, description) {
  const template = handlebars.compile(`
    <!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8" />
    <title>{{title}}</title>
    <meta name="description" content="{{description}}" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
    <main id="root"></main>
    <script src="main.bundle.js"></script>
    </body>
    </html>
  `);
  if (html === undefined) {
    html = minify(
      template({ title, description, }),
      { collapseWhitespace: true, },
    );
  }
  return html;
}
