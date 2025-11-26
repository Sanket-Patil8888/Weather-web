# React Weather App - ReactJS Projects

![](weather.gif)

### Demo - Deployed over Github Pages 
https://ayushkul.github.io/react-weather-app

### Full development Tutorial 
[Youtube Tutorial - The Indian Dev](https://www.youtube.com/watch?v=_UXycMmVYj0)

### APIs Used
[Open Weather APIs](https://openweathermap.org/)

https://openweathermap.org/current

### API Info
* Method: `GET`
* URL: `https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY}`

### Icons & Font -
* Icons: [ayushkul/react-weather-app](https://github.com/ayushkul/react-weather-app/tree/master/public/icons)
* Font Link: `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">`

### Libraries used
* `styled-components`
* `axios`
* `react-scripts`

### Whom do I talk to? ###

* AyushK : [The Indian Dev](https://www.instagram.com/theindiandev)

### How can I appreciate this repo? ###

* By giving this repo a 🌟
* By Subscribing : [The Indian Dev](https://www.youtube.com/channel/UCbaR6YYn5VGXrR5_f-4tNsA) at Youtube
* By Following : [The Indian Dev](https://www.instagram.com/theindiandev) at Instagram


## Local Setup

- Copy `.env.example` to `.env.local` in the project root and add your OpenWeather API key:

```bash
cp .env.example .env.local
# edit .env.local and set REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

- Start the dev server:

```powershell
cd 'c:\Users\sanket\Downloads\react-weather-app-master\react-weather-app-master'
npm install
npm start
```

- If the app shows an error about a missing API key, add your key to `.env.local` and restart the dev server.

See `ENV_SETUP.md` for detailed environment and API instructions.

