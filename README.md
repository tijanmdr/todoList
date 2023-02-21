# TodoList

This is is to do list application written in Angular with Translation Service with different languages with the help of Microsoft Translator.

## Prerequisites:

In your base project folder, type in the following commands.

- `npm install -g @angular/cli` - to install angular cli
- `npm install -g json-server` - used fake json server to use in the application
- `npm install` - to install dependencies required for the application
- `cp _db.json db.json` - json server database (for offline access only - change `baseUrl` variable to `http://localhost:3000` in `src/app/services/api.service.ts`)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Login Details

Login Details for admin access are as follows: 
- Email: `tijanmdr@gmail.com`
- Password: `qwerty123`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
