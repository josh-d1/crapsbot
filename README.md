# Crapsbot!

An Angular2 craps game with a Typescript game engine and CSS animations.

I'm hoping it can be used to help others learning Angular2 as well as designers looking for something to play with a la CSS Zen Garden.

Created using the [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html).


## Prerequisites
The quickstart recommends at least node v4.x.x but I'm using **node v6.3.1** and **npm 3.10.3**.

## Setup
Install the npm packages described in the `package.json` and verify that it works:

```bash
npm install
npm start serve
```

```
> angular-quickstart@1.0.0 start $/dev/crapsbot
> tsc && concurrently "tsc -w" "lite-server"  "serve"

[2] Running on http://10.1.1.103:3000 [copied to clipboard]
[1] Did not detect a `bs-config.json` or `bs-config.js` override file. Using lite-server defaults...
[1] ** browser-sync config **
[1] { injectChanges: false,
[1]   files: [ './**/*.{html,htm,css,js}' ],
[1]   watchOptions: { ignored: 'node_modules' },
[1]   server: { baseDir: './', middleware: [ [Function], [Function] ] } }
[1] [BS] Access URLs:
[1]  -----------------------------------
[1]        Local: http://localhost:3001
[1]     External: http://10.1.1.103:3001
[1]  -----------------------------------
[1]           UI: http://localhost:3002
[1]  UI External: http://10.1.1.103:3002
[1]  -----------------------------------
[1] [BS] Serving files from: ./

```

### npm scripts

Defined in `package.json`:

* `npm start start` - runs the compiler and a server at the same time, both in "watch mode" - file changes force a
browser reload.
* `npm start serve` - runs the compiler in "watch mode" and a server at the same time - reload the browser to get the
latest file changes.
* `npm run tsc` - runs the TypeScript compiler once.
* `npm run tsc:w` - runs the TypeScript compiler in watch mode; the process keeps running, awaiting changes to TypeScript files and re-compiling when it sees them.

## Testing

todo

### Unit Tests

todo
 
### End-to-end (E2E) Tests

todo
