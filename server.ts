import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Add CORS headers with wildcard subdomain support
  server.use((req, res, next) => {
    const origin = req.headers.origin;
    // Check if the origin matches *.sc.royasoftware.com or localhost
    if (origin && (
      origin.match(/^https?:\/\/[^.]+\.sc\.royasoftware\.com(:\d+)?$/) ||
      origin.match(/^https?:\/\/localhost(:\d+)?$/)
    )) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

  // Serve static files from /browser with proper CORS handling
  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    setHeaders: (res, path, stat) => {
      const origin = res.req.headers.origin;
      if (origin && (
        origin.match(/^https?:\/\/[^.]+\.sc\.royasoftware\.com(:\d+)?$/) ||
        origin.match(/^https?:\/\/localhost(:\d+)?$/)
      )) {
        res.set('Access-Control-Allow-Origin', origin);
      }
      if (path.endsWith('/favicon.ico')) {
        res.set('Content-Type', 'image/x-icon');
      }
    }
  }));

  // Explicit route for favicon with CORS handling
  server.get('/favicon.ico', (req, res) => {
    const origin = req.headers.origin;
    if (origin && (
      origin.match(/^https?:\/\/[^.]+\.sc\.royasoftware\.com(:\d+)?$/) ||
      origin.match(/^https?:\/\/localhost(:\d+)?$/)
    )) {
      res.set('Access-Control-Allow-Origin', origin);
    }
    res.set('Content-Type', 'image/x-icon');
    res.sendFile(join(browserDistFolder, 'favicon.ico'));
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
