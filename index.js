'use strict';
const http = require('node:http');
const pug = require('pug');
const server = http
  .createServer((req, res) => {
    const now = new Date();
    console.info(`[${now}] Requested by ${req.socket.remoteAddress}`);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    
    switch (req.method) {    //4以上の条件分岐に最適 case nで分岐 breakで分割 defaultはfalse
      case 'GET':
          if (req.url === `/`){
            res.write('<!DOCTYPE html><html lang="ja"><body>' +
            '<h1>アンケートフォーム</h1>' +
            '<a href="/enquetes">アンケート一覧</a>' +
            '</body></html>');
            } else if (req.url === '/enquetes') {
          res.write('<!DOCTYPE html><html lang="ja"><body>' +
            '<h1>アンケート一覧</h1><ul>' +
            '<li><a href="/enquetes/chrono-rexica">chrono-rexica</a></li>' +
            '<li><a href="/enquetes/kimidori">≡君彩≡</a></li>' +
            '<li><a href="/enquetes/itipomu">ストロベリーポップムーン</a></li>' +
            '</ul></body></html>');
        } else if (req.url === '/enquetes/chrono-rexica') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: '囚われのTeatime',
              secondItem: 'dans l′obscurité'
            })
          );
        } else if (req.url === '/enquetes/kimidori') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: 'ReTale',
              secondItem: 'パンとフィルム'
            })
          );
        } else if (req.url === '/enquetes/itipomu') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: 'ABSOLUTE RUN!!!',
              secondItem: 'Be proud'
            })
          );
        }
        res.end();
        break;
      case 'POST':
        let rawData = '';
        req
          .on('data', chunk => {
            rawData += chunk;
          })
          .on('end', () => {
            const answer = new URLSearchParams(rawData)
            res.write(
              `<!DOCTYPE html><html lang="ja"><body><h1>${answer.get(`name`)}さんは${answer.get(`music`)}に投票しました</h1></body></html>`
            );
                        res.end();
          });
        break;
      default:
        break;
    }
  })
  .on('error', e => {
    console.error(`[${new Date()}] Server Error`, e);
  })
  .on('clientError', e => {
    console.error(`[${new Date()}] Client Error`, e);
  });
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
