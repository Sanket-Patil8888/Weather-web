# Environment Setup Guide for React Weather App

## API Configuration

This project uses the **OpenWeather API** for weather data, hourly forecasts, and pollution information.

### Step 1: Get Your OpenWeather API Key

1. Visit [OpenWeather Sign Up](https://openweathermap.org/api)
2. Create a free account
3. Go to [API Keys](https://home.openweathermap.org/api_keys)
4. Copy your default API key (or create a new one)

### Step 2: Setup Environment Variables

The project uses `.env.local` for local development. This file is **NOT** committed to version control for security.

#### Option A: Using the provided `.env.local`

```bash
# File: .env.local
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
REACT_APP_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
REACT_APP_OPENWEATHER_ONECALL_VERSION=3
REACT_APP_DEBUG_API_CALLS=false
```

1. Open or create `.env.local` in the project root
2. Replace `your_api_key_here` with your actual API key from Step 1
3. Save the file

#### Option B: Using `.env.example` as template

```bash
cp .env.example .env.local
# Then edit .env.local and replace placeholder with your API key
```

### Step 3: Verify Setup

After setting the environment variables:

1. Stop any running dev server: `Ctrl+C`
2. Restart the dev server: `npm start`
3. Check the browser console for any API warnings
4. Search for a city to verify the API is working

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_OPENWEATHER_API_KEY` | Your OpenWeather API key (REQUIRED) | `86abdeb5fee09e6a11227274e903aead` |
| `REACT_APP_OPENWEATHER_BASE_URL` | API base URL | `https://api.openweathermap.org/data/2.5` |
| `REACT_APP_OPENWEATHER_ONECALL_VERSION` | One Call API version | `3` |
| `REACT_APP_DEBUG_API_CALLS` | Enable API debug logging | `true` or `false` |

### API Endpoints Used

The app makes requests to these OpenWeather API endpoints:

1. **Current Weather** - `/weather?q={city}&units=metric`
   - Used for: Current temperature, conditions, humidity, wind
   - Free tier: ✅ Available

2. **One Call API** - `/onecall?lat={lat}&lon={lon}`
   - Used for: Hourly forecast (24h), daily forecast (7 days)
   - Free tier: ✅ Available (1000 calls/day)

3. **Air Pollution** - `/air_pollution?lat={lat}&lon={lon}`
   - Used for: AQI, pollutant levels, mask recommendations
   - Free tier: ✅ Available

### Important Notes

- **Keep your API key private!** Never commit `.env.local` to version control
- `.env.local` is already listed in `.gitignore` — it will not be tracked
- Use `.env.example` as a template for other developers to follow
- Free tier limits: 1,000 API calls per day
- Response time: API responses are cached in browser localStorage

### Troubleshooting

**Q: "REACT_APP_OPENWEATHER_API_KEY is not set" warning**
- A: Make sure `.env.local` exists in the project root with your API key set
- Restart the dev server after creating/updating `.env.local`

**Q: API returns 401 Unauthorized**
- A: Check your API key is correct in `.env.local`
- Verify key hasn't expired or been revoked in OpenWeather dashboard

**Q: App shows "Couldn't find that city"**
- A: Could be an invalid city name OR API limit exceeded
- Check browser console (F12) for detailed error messages
- If using free tier, verify you haven't exceeded 1,000 calls/day

**Q: Some data (hourly/pollution) not showing**
- A: One Call API or Air Pollution may not have data for that location
- This is normal for very remote areas
- Data will be loaded from cache if previously fetched

### Production Deployment

For production (Vercel, Netlify, etc.):

1. Add `REACT_APP_OPENWEATHER_API_KEY` as an environment variable in your platform's settings
2. **DO NOT** expose the raw key in client-side code
3. For maximum security, consider setting up a backend proxy to handle API requests

### Support

- OpenWeather Documentation: https://openweathermap.org/api
- GitHub Issues: Report bugs or questions
- Free tier includes: Current weather, One Call, Air Pollution, Geocoding
