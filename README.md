# String Tension Calculator

## General

Ensure you have the 'sass' and `typescript` packages installed in 'npm', which requires a node.js installation. Use node version `18.17.1` (which is the `LTS` version at the time of writing this).

## Sass

To compile the sass code to css, in the root directory of the project, use:
```
npm run build-styles
```

To compile sass code while watching for changes, in the root directory of the project, use:
```
npm run watch-styles
```

To stop watching, use `ctrl-c`.

## TypeScript

With respect to the options defined in `tsconfig.json`, we are building any files in `./src/ts` into the folder `./dist`. Since we have defined `allowJS`, it will accept JavaScript files as well.

To compile TypeScript code into the JavaScript files, in the root directory of the project, use:
```
tsc
```
