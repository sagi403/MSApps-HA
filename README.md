# MSApps

This project is an image gallery application with category-based filtering and pagination features, implemented in Node.js and React, showcasing a 3x3 grid of images fetched dynamically based on user-selected categories, and allowing users to navigate through the images using 'prev' and 'next' buttons.

## Technologies

- React
- Node.js
- Redux
- TailwindCSS

## Usage

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

### Env Variables

Create a .env file in the backend directory and add the following:

```
PORT = 5000
NODE_ENV = development
BASE_URL = https://pixabay.com/api
API_KEY = your api key
```

### Install Dependencies (frontend & backend)

```
cd frontend
npm install
cd ../backend
npm install
```

### Run

Run frontend (:5173) & backend (:5000)

```
cd backend
npm run develop
```

Run backend (:1337)

```
cd backend
npm run server
```

Run frontend (:5173)

```
cd frontend
npm run dev
```

## License

This project is open source and available under the MIT License.
