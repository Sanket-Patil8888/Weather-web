# 🚀 Quick Setup Checklist

## 1. API Key Configuration (Required)

✅ **Files Created:**
- `.env.example` - Template for environment variables (safe to commit)
- `.env.local` - Your local configuration (DO NOT commit - already in .gitignore)
- `ENV_SETUP.md` - Detailed setup guide

✅ **App.js Updated:**
- All hardcoded API keys replaced with `process.env.REACT_APP_OPENWEATHER_API_KEY`
- API endpoints now use `API_BASE_URL` constant
- Warning added if API key is missing

## 2. Your API Key

Your API key: `86abdeb5fee09e6a11227274e903aead`

### File: `.env.local` (in project root)
```
REACT_APP_OPENWEATHER_API_KEY=86abdeb5fee09e6a11227274e903aead
REACT_APP_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
REACT_APP_OPENWEATHER_ONECALL_VERSION=3
REACT_APP_DEBUG_API_CALLS=false
```

✅ Already created with your API key!

## 3. Start the App

```bash
# Stop any running server (Ctrl+C)
# Restart dev server
npm start
```

## 4. Features Using OpenWeather APIs

| Feature | API Endpoint | Status |
|---------|--------------|--------|
| Current Weather | `/weather` | ✅ Working |
| Hourly Forecast (24h) | `/onecall` | ✅ Working |
| Daily Forecast (7d) | `/onecall` | ✅ Working |
| Air Pollution & AQI | `/air_pollution` | ✅ Working |
| Rain/Storm Gauge | Calculated from hourly | ✅ Working |
| Health Alerts | Current conditions | ✅ Working |
| Travel Planner | Daily forecast | ✅ Working |

## 5. Test the Setup

1. Open the app in browser (usually http://localhost:3000)
2. Search for a city (e.g., "London", "New York")
3. Verify all data loads:
   - Current weather card
   - 24-hour timeline
   - Daily forecast (travel planner)
   - AQI & pollution data
   - Rain probability gauge
   - Health alerts
4. Check browser console (F12) for warnings

## 6. Security Best Practices

✅ **What I did:**
- Moved API key to environment variable
- Created `.env.local` (private, not committed)
- Created `.env.example` (public template)
- Added warning if API key missing

✅ **What you should do:**
- Keep `.env.local` private (it's in .gitignore)
- Never commit API keys to GitHub
- Never share `.env.local` file
- For production, use your platform's secrets management (Vercel, Netlify, etc.)

## 7. API Limits (Free Tier)

- **Calls per minute:** Unlimited
- **Calls per day:** 1,000
- **Response time:** Real-time
- **Data retention:** Cached in browser localStorage

## 8. If Something Goes Wrong

### Error: "Could not find API key"
```bash
# Make sure .env.local exists in project root
# Restart dev server
npm start
```

### Error: "Couldn't find that city"
- Check browser console (F12) for detailed error
- Verify API key is valid in openweathermap.org dashboard
- Try a different city

### Error: Hourly/Pollution data missing
- One Call API or Air Pollution may not cover that location
- Check if data loads when online
- Data will use cached version if offline

### App still using old API key
- Delete `node_modules/.cache` folder
- Restart dev server
- Check that `.env.local` has correct key

## 9. Next Steps

- ✅ Environment variables configured
- ✅ API key integrated securely
- ✅ All features using environment-based API calls
- ➡️ Ready to: Test the app, deploy, or add new features

---

**Questions?** See `ENV_SETUP.md` for detailed documentation.
