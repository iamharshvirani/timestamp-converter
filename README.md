# Timestamp Converter

A modern web application for converting between Unix timestamps and human-readable dates, with support for multiple time formats and precision levels.

## Features

- Epoch to Human-Readable Date Converter
- Human-Readable Date to Epoch Converter
- Multiple Time Format Support (UTC, Local, ISO 8601)
- Timestamp Generator for Current & Future Dates
- Support for Multiple Precision Levels (seconds, milliseconds, microseconds, nanoseconds)

## Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd timestamp-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment Options

### 1. Deploy with Docker

1. Build the Docker image:
```bash
docker build -t timestamp-converter .
```

2. Run the container:
```bash
docker run -p 80:80 timestamp-converter
```

The application will be available at `http://localhost`.

### 2. Deploy to GitHub Pages (Free Hosting)

1. Add the `homepage` field to your `package.json`:
```json
{
  "homepage": "https://<your-github-username>.github.io/timestamp-converter"
}
```

2. Install the `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

3. Add deployment scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. Deploy the application:
```bash
npm run deploy
```

### 3. Deploy to Netlify (Free Hosting)

1. Create a Netlify account at [netlify.com](https://www.netlify.com)
2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Build the application:
```bash
npm run build
```

4. Deploy to Netlify:
```bash
netlify deploy
```

### 4. Deploy to Vercel (Free Hosting)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

## Production Build

To create a production build:
```bash
npm run build
```

This creates an optimized build in the `build` folder.

## Technologies Used

- React
- Material-UI
- Luxon (for date/time handling)
- Docker (optional)
- Nginx (for Docker deployment)

## License

MIT
