# String Tension Calculator

If you want to simply use it, go [here](https://kyletaylorlange.github.io/StringTensionCalculator/)!

Otherwise, if you would like work on it locally on your machine, please follow the instructions below.

## General

Make sure you `git clone` the repository so that you have a copy.

Ensure you have the `sass` and `typescript` packages installed in `npm`, which requires a node.js installation.

This project is using the `import` syntax for ES6 modules.

To view the project locally, using the VSCode extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) works pretty well! Once it's installed, go to the `index.html` file and then click **Go Live** in the status bar, and this will open it in the browser.

## Sass

Any scss code is compiled into a css file in `./dist`, as defined in `package.json`.

To compile the scss code to css, in the root directory of the project, use:
```
npm run build-styles
```

To watch for changes in scss code, use:
```
npm run watch-styles
```

To stop watching, use `Ctrl-C`.

## TypeScript

With respect to the options defined in `tsconfig.json`, we are building any files in `./src`, as well as any JSON data in `./json`, into the folder `./dist`. Since we have defined `allowJS`, it will accept JavaScript files as well. All imports are defined to use the JavaScript distributables in `./dist`.

To compile TypeScript code into the JavaScript files, in the root directory of the project, use:
```
npx run tsc
```

To watch for changes in TypeScript code, use:
```
npx run tsc --watch
```

To stop watching, use `Ctrl-C`.