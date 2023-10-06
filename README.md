# String Tension Calculator

## General

Ensure you have the `sass` and `typescript` packages installed in `npm`, which requires a node.js installation. Use node version `18.17.1` (which is the `LTS` version at the time of writing this).

This project is using the `import` syntax for ES6 modules.

## Sass

Any scss code is compiled into a css file in `./dist`, as defined in `package.json`.

To compile the scss code to css, in the root directory of the project, use:
```
npm run build-styles
```

To compile scss code while watching for changes, in the root directory of the project, use:
```
npm run watch-styles
```

To stop watching, use `Ctrl-C`.

## TypeScript

With respect to the options defined in `tsconfig.json`, we are building any files in `./src`, as well as any JSON data in `./json`, into the folder `./dist`. Since we have defined `allowJS`, it will accept JavaScript files as well. All imports are defined to use the JavaScript distributables in `./dist`.

To compile TypeScript code into the JavaScript files, in the root directory of the project, use:
```
tsc
```

To compile TypeScript and watch for changes, use:
```
tsc --watch
```

To stop watching, use `Ctrl-C`.