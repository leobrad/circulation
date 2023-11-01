import handlebars from 'handlebars';
import { minify, } from 'html-minifier';

export default function getHtml(title, description, lang) {
  const template = handlebars.compile(`
    <!doctype html>
    <html lang="{{lang}}">
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
  return minify(
    template({ title, description, lang, }), { collapseWhitespace: true, },
  );
}
