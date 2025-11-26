Redesigned UI preview for AgriWeather

What this folder contains
- `index.html` – standalone preview page using the new design
- `styles.css` – complete styles (responsive, animations, glass option)
- `app.js` – demo JS to simulate API responses and show animations

How to preview
1. Open `designs/redesign/index.html` in your browser (double-click) or serve with a local static server.

Design choices (short)
- Modern minimal: neutral dark gradient background, bright accent color for contrast.
- Card-based layout: content divided into clear cards for readability and hierarchy.
- Typography: clean UI font (Inter / system stack), strong headings with balanced weight.
- Weather-driven visuals: large icon area and gradient-backed cards that can adapt to weather conditions.
- Animations: skeleton shimmer for loading, hover lift for cards, subtle button motion for polish.
- Responsiveness: grid collapses to single-column on small screens; hourly forecast becomes horizontally scrollable.
- Glass option: toggleable glassmorphism for a frosted panel look (press "Glass" button in demo).

How to integrate into React (quick)
1. Move styles from `styles.css` into a global CSS (e.g., `src/styles/ui.css`) or use styled-components.
2. Convert major sections into components: `Header`, `SearchBar`, `WeatherCard`, `InfoGrid`, `Hourly`, `WeekForecast`, `AQICard`, `Loader`.
3. Use `useWeatherData` hook to fetch and pass props; keep animation states via local component state.

10 extra UI features you can add later
1. Animated background layers for each weather type (moving clouds, raindrops, sun rays).
2. A unit toggle (Celsius / Fahrenheit) with smooth animated value transitions.
3. A map mini-panel showing location and weather pins.
4. Saved locations / favorites with quick-swapping animation.
5. Severe weather banners and dismissible notifications.
6. Share snapshot image export (generate a PNG of the current card).
7. Accessibility improvements: high-contrast mode and keyboard navigation focus ring.
8. Multi-language support and localized date/time formatting.
9. Detailed pollutant breakdown with small charts for the AQI card.
10. Animated forecast carousel for quick mobile swiping.

Optional variants
- Glassmorphism: already available by toggling the `glass` class (demo toggle button). Use backdrop-filter for richer blur.
- Neumorphism: adjust shadows and background to soft light/dark shadows for tactile buttons.

If you'd like, I can now:
- Convert this static preview into React components and wire it to your existing `useWeatherData` hook.
- Implement specific animated icons (SVG + CSS) and weather-driven themes.
- Create unit tests and small visual regression snapshots.

Tell me which next step you prefer and I'll continue implementing it directly into your project files.
