// Simple demo JS to simulate fetching and animate UI. Replace with real API calls in React.
const SAMPLE = {
  city: 'Mumbai, IN',
  temp: 29,
  cond: 'Partly Cloudy',
  humidity: 65,
  wind: 12,
  sunrise: '06:12',
  sunset: '18:11',
  hourly: [
    {t:'Now',icon:'☀️',temp:29},
    {t:'13:00',icon:'🌤',temp:30},
    {t:'14:00',icon:'⛅️',temp:31},
    {t:'15:00',icon:'🌧',temp:28},
    {t:'16:00',icon:'🌦',temp:27}
  ],
  aqi: {val:42, text:'Good'},
  week: [
    {d:'Sun',i:'☀️',h:33,l:26},
    {d:'Mon',i:'🌤',h:32,l:25},
    {d:'Tue',i:'🌧',h:29,l:24},
    {d:'Wed',i:'⛅️',h:30,l:24},
    {d:'Thu',i:'⛈',h:27,l:23},
    {d:'Fri',i:'☁️',h:28,l:22},
    {d:'Sat',i:'🌤',h:31,l:24}
  ]
}

function setSkeleton(state){
  const hero = document.getElementById('hero');
  if(state){
    hero.classList.add('shimmer-theme');
    document.querySelectorAll('.info-value, .temp, .cond, .aqi-value, .aqi-text, .hour-item, .day-card').forEach(el=>el.classList.add('skeleton'))
  } else {
    hero.classList.remove('shimmer-theme');
    document.querySelectorAll('.info-value, .temp, .cond, .aqi-value, .aqi-text, .hour-item, .day-card').forEach(el=>el.classList.remove('skeleton'))
  }
}

function render(data){
  document.getElementById('city').textContent = data.city
  document.getElementById('tempVal').textContent = data.temp + '°C'
  document.getElementById('condText').textContent = data.cond
  document.getElementById('humidity').textContent = data.humidity + ' %'
  document.getElementById('wind').textContent = data.wind + ' km/h'
  document.getElementById('sunrise').textContent = data.sunrise
  document.getElementById('sunset').textContent = data.sunset
  document.getElementById('aqiVal').textContent = data.aqi.val
  document.getElementById('aqiText').textContent = data.aqi.text
  document.getElementById('updated').textContent = new Date().toLocaleTimeString()

  const hourly = document.getElementById('hourly'); hourly.innerHTML = ''
  data.hourly.forEach(h=>{
    const it = document.createElement('div'); it.className='hour-item';
    it.innerHTML = `<div class='h-time'>${h.t}</div><div class='h-icon'>${h.icon}</div><div class='h-temp'>${h.temp}°</div>`;
    hourly.appendChild(it);
  })

  const weekList = document.getElementById('weekList'); weekList.innerHTML=''
  data.week.forEach(d=>{
    const el = document.createElement('div'); el.className='day-card';
    el.innerHTML = `<div class='d-day'>${d.d}</div><div class='d-icon'>${d.i}</div><div class='d-temp small'>${d.h}° / ${d.l}°</div>`;
    weekList.appendChild(el);
  })
}

// simulate fetch
setSkeleton(true)
setTimeout(()=>{
  setSkeleton(false)
  render(SAMPLE)
},1200)

// Search simulation
const form = document.getElementById('searchForm')
form.addEventListener('submit', e=>{
  e.preventDefault();
  setSkeleton(true)
  const q = document.getElementById('searchInput').value || 'Mumbai'
  // Replace below with real fetch. For demo, we just update city name and reuse SAMPLE
  setTimeout(()=>{
    SAMPLE.city = q + ', IN'
    render(SAMPLE)
    setSkeleton(false)
  },900)
})

// Glass toggle
const glassBtn = document.getElementById('glassToggle')
glassBtn.addEventListener('click', ()=>{
  document.body.classList.toggle('glass')
})

// GPS simulation
const locBtn = document.getElementById('locBtn')
locBtn.addEventListener('click', ()=>{
  setSkeleton(true)
  setTimeout(()=>{
    SAMPLE.city = 'Current Location, IN'
    render(SAMPLE)
    setSkeleton(false)
  },900)
})
