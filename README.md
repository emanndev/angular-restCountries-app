# REST Countries Angular App

This is a fully functional Angular 17+ application that consumes the [REST Countries API](https://restcountries.com/) to display detailed information about countries around the world. It includes search, filtering, dark/light theme toggle, and country details with clickable border navigation — all powered by **NgRx** for state management.

## Features

- Display a list of countries
- Search for countries by name
- Filter countries by region
- Toggle between Light and Dark themes
- Click on a country to view its details
- View and navigate to border countries
- Global loading spinner for data fetching
- Fully responsive design

## Tech Stack

| Technology            | Use Case              |
| --------------------- | --------------------- |
| Angular 17            | Application framework |
| Angular Router        | Routing               |
| NgRx (Store, Effects) | State management      |
| RxJS                  | Reactive streams      |
| SCSS                  | Styling and theming   |
| REST Countries API    | External data source  |

## Folder Structure

src/
├── app/
│   ├── components/         # Standalone components
│   ├── models/             # Interfaces (Country)
│   ├── pipes/              # Custom pipes (population, object list)
│   ├── services/           # API service
│   ├── store/              # NgRx state files
│   ├── app.routes.ts       # App routing config
│   └── app.component.ts    # Root component
│   └── app.component.html    # Root component

## State Management with NgRx

The application uses NgRx to manage:

- All country data

- Selected country

- Search query & region filter

- Theme (light or dark)

- Loading and error state

- Actions/Reducers/Selectors are organized in src/app/store.

## Clone the repo

git clone https://github.com/your-username/rest-countries-angular.git
cd rest-countries-angular

## Install dependencies

npm install

## Run the app

ng serve

## Routes

/countries  -	Main country list page
/countries/:code  -  	Details page for selected country

## License

no commercial license applied.

