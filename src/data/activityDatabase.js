// Activity Database with detailed information
export const ACTIVITY_DATABASE = {
  'Swimming': {
    icon: '🏊',
    tempRange: 'Above 32°C',
    caloriesBurned: '200–300 kcal (30 min)',
    bodyEffects: ['Helps cool down the body', 'Reduces heat stress', 'Maintains hydration balance', 'Prevents overheating'],
    bestTime: 'Early morning or after 5 PM',
    precautions: ['Avoid outdoor activities from 11 AM to 4 PM', 'Drink plenty of water', 'Take breaks', 'Avoid sweating excessively', 'Stay in shade or indoors'],
    duration: '20–30 minutes',
    difficulty: 'Moderate',
    benefits: ['Cooling', 'Stress Relief', 'Full Body Workout']
  },
  'Indoor Games': {
    icon: '🎮',
    tempRange: 'Above 32°C',
    caloriesBurned: '80–150 kcal (30 min)',
    bodyEffects: ['Keeps you indoors in heat', 'Provides entertainment', 'Reduces heat exposure', 'Mental engagement'],
    bestTime: 'Anytime (preferably afternoon)',
    precautions: ['Stay hydrated', 'Take breaks', 'Maintain good posture', 'Limit screen time'],
    duration: '30–60 minutes',
    difficulty: 'Light',
    benefits: ['Relaxation', 'Entertainment', 'Mind Exercise']
  },
  'Light Yoga': {
    icon: '🧘',
    tempRange: 'Above 32°C',
    caloriesBurned: '90–120 kcal (30 min)',
    bodyEffects: ['Improves flexibility', 'Reduces stress', 'Calms the body', 'Improves breathing'],
    bestTime: 'Early morning or evening',
    precautions: ['Practice in ventilated area', 'Stay hydrated', 'Avoid intense poses in heat', 'Use yoga mat'],
    duration: '30–45 minutes',
    difficulty: 'Light',
    benefits: ['Flexibility', 'Stress Relief', 'Relaxation']
  },
  'Evening Walk': {
    icon: '🚶',
    tempRange: 'Above 32°C',
    caloriesBurned: '100–130 kcal (30 min)',
    bodyEffects: ['Light cardiovascular exercise', 'Reduces body heat gradually', 'Improves sleep', 'Aids digestion'],
    bestTime: 'After 5 PM (evening)',
    precautions: ['Walk in well-lit areas', 'Carry water bottle', 'Wear comfortable shoes', 'Avoid traffic areas'],
    duration: '20–30 minutes',
    difficulty: 'Light',
    benefits: ['Cardio', 'Relaxation', 'Digestion']
  },
  'Cycling': {
    icon: '🚴',
    tempRange: '25–32°C',
    caloriesBurned: '200–350 kcal (30 min)',
    bodyEffects: ['Improves stamina', 'Good sweating and toxin removal', 'Increases heart rate safely', 'Boosts metabolism'],
    bestTime: 'Morning and evening',
    precautions: ['Carry water bottle', 'Apply sunscreen', 'Avoid dusty roads', 'Take breaks', 'Wear helmet'],
    duration: '30–45 minutes',
    difficulty: 'Moderate',
    benefits: ['Stamina', 'Weight Loss', 'Cardio']
  },
  'Jogging': {
    icon: '🏃',
    tempRange: '25–32°C',
    caloriesBurned: '250–400 kcal (30 min)',
    bodyEffects: ['Improves stamina significantly', 'Burns calories effectively', 'Strengthens muscles', 'Boosts metabolism'],
    bestTime: 'Morning (best) or evening',
    precautions: ['Warm up before', 'Cool down after', 'Apply sunscreen', 'Avoid extreme heat', 'Wear proper shoes'],
    duration: '20–30 minutes',
    difficulty: 'Moderate-High',
    benefits: ['Weight Loss', 'Stamina', 'Muscle Building']
  },
  'Running': {
    icon: '🏃',
    tempRange: 'Pleasant 18–25°C (best); Warm 25–32°C (with precautions); Hot >32°C (not recommended); Cool 10–18°C (good); Cold <10°C (requires warm clothing)',
    caloriesBurned: 'Light running (30 minutes): 250–350 kcal; Medium pace (30 minutes): 350–450 kcal; Fast running (30 minutes): 450–600 kcal',
    bodyEffects: ['Improves heart and lung function', 'Boosts immunity', 'Reduces fat and helps in weight loss', 'Strengthens leg muscles', 'Increases metabolism', 'Reduces stress (endorphin release)', 'Improves sleep quality'],
    bestTime: 'Hot: early morning or after 6 PM; Warm/Pleasant: anytime; Cool: morning or afternoon; Cold: late morning/noon',
    precautions: ['Warm up for 5 minutes', 'Wear proper running shoes', 'Stay hydrated', 'Avoid running right after eating', 'If temp >32°C choose walking', 'If temp <10°C wear warm clothes', 'Avoid slippery/wet roads', 'Stop if dizziness or chest pain'],
    duration: 'Light: 20–30 min; Medium: 30–45 min; Long: 45+ min',
    difficulty: 'Light → High depending on pace',
    benefits: ['Burns fat', 'Improves cardiovascular health', 'Builds endurance', 'Enhances mental clarity', 'Improves bone density', 'Reduces anxiety and stress'],
    hydrationTips: ['Drink water 20 minutes before running', 'Sip water during long runs (>30 min)', 'Use electrolytes if weather is hot'],
    temperatureAdvice: {
      hot: 'Avoid running; prefer walking or indoor treadmill; high risk of heat stroke',
      warm: 'OK to run; carry water; run in shade; wear breathable clothes',
      pleasant: 'Best time for running; maximum stamina & comfort',
      cool: 'Great for long-distance running; warm up properly',
      cold: 'Wear layers; cover ears and hands; prefer shorter runs'
    }
  },
  'Outdoor Sports': {
    icon: '⚽',
    tempRange: '25–32°C',
    caloriesBurned: '250–350 kcal (45 min)',
    bodyEffects: ['Excellent cardiovascular workout', 'Builds muscle and strength', 'Improves coordination', 'Mental engagement'],
    bestTime: 'Morning and evening',
    precautions: ['Stay hydrated', 'Warm up properly', 'Take breaks', 'Play in safe area', 'Wear protective gear if needed'],
    duration: '45–60 minutes',
    difficulty: 'High',
    benefits: ['Muscle Building', 'Cardio', 'Team Work']
  },
  'Short Hiking': {
    icon: '⛰️',
    tempRange: '25–32°C',
    caloriesBurned: '180–260 kcal (30 min)',
    bodyEffects: ['Builds endurance', 'Strengthens legs', 'Improves balance', 'Great for mental health'],
    bestTime: 'Early morning',
    precautions: ['Start with easy trails', 'Carry water and snacks', 'Wear proper shoes', 'Bring a map', 'Tell someone where you are'],
    duration: '30–60 minutes',
    difficulty: 'Moderate',
    benefits: ['Stamina', 'Mental Wellness', 'Leg Strength']
  },
  'Long Walks': {
    icon: '🚶',
    tempRange: '18–25°C',
    caloriesBurned: '150–200 kcal (45 min)',
    bodyEffects: ['Perfect temperature for physical activity', 'Improves mood and reduces stress', 'Excellent for cardiovascular health', 'Enhances lung function'],
    bestTime: 'Anytime (ideal weather)',
    precautions: ['Stay hydrated', 'Wear comfortable shoes', 'Wear sunscreen', 'Carry light jacket if windy'],
    duration: '45–60 minutes',
    difficulty: 'Light',
    benefits: ['Stress Relief', 'Cardio', 'Mental Wellness']
  },
  'Trekking': {
    icon: '🏔️',
    tempRange: '18–25°C',
    caloriesBurned: '300–500 kcal (1 hour)',
    bodyEffects: ['Excellent full-body workout', 'Improves cardiovascular health', 'Builds strong legs', 'Reduces stress significantly'],
    bestTime: 'Early morning to afternoon',
    precautions: ['Proper trekking shoes', 'Carry water and energy bars', 'Start early', 'Tell someone your route', 'Bring first aid kit'],
    duration: '2–4 hours',
    difficulty: 'High',
    benefits: ['Stamina', 'Mental Wellness', 'Muscle Building']
  },
  'Picnics': {
    icon: '🧺',
    tempRange: '18–25°C',
    caloriesBurned: '120–180 kcal (1 hour)',
    bodyEffects: ['Light activity and relaxation', 'Improves mood', 'Social bonding', 'Stress relief'],
    bestTime: 'Anytime during day',
    precautions: ['Pack healthy food', 'Bring water', 'Use sunscreen', 'Clean area after'],
    duration: '2–4 hours',
    difficulty: 'Light',
    benefits: ['Relaxation', 'Social', 'Stress Relief']
  },
  'Photography Walks': {
    icon: '📸',
    tempRange: '18–25°C',
    caloriesBurned: '130–170 kcal (1 hour)',
    bodyEffects: ['Light walking and mental engagement', 'Improves observation skills', 'Reduces stress', 'Creative outlet'],
    bestTime: 'Morning or golden hour (evening)',
    precautions: ['Comfortable walking shoes', 'Protect camera', 'Stay aware of surroundings', 'Carry water'],
    duration: '1–3 hours',
    difficulty: 'Light',
    benefits: ['Stress Relief', 'Creativity', 'Relaxation']
  },
  'Meditation': {
    icon: '🧘',
    tempRange: '10–18°C',
    caloriesBurned: '15–20 kcal (30 min)',
    bodyEffects: ['Reduces stress and anxiety', 'Lowers blood pressure', 'Improves focus', 'Emotional balance'],
    bestTime: 'Early morning or evening',
    precautions: ['Find quiet place', 'Sit comfortably', 'Consistent practice', 'Peaceful environment'],
    duration: '15–30 minutes',
    difficulty: 'Light',
    benefits: ['Stress Relief', 'Mental Wellness', 'Relaxation']
  },
  'Outdoor Sightseeing': {
    icon: '🎒',
    tempRange: '10–18°C',
    caloriesBurned: '110–150 kcal (1 hour)',
    bodyEffects: ['Moderate activity', 'Improves mood', 'Social engagement', 'Stimulates mind'],
    bestTime: 'Mid-morning to afternoon',
    precautions: ['Wear comfortable clothes', 'Bring water', 'Wear sunscreen', 'Pace yourself'],
    duration: '2–4 hours',
    difficulty: 'Light-Moderate',
    benefits: ['Relaxation', 'Social', 'Mental Wellness']
  },
  'Nature Walks': {
    icon: '🌲',
    tempRange: '10–18°C',
    caloriesBurned: '120–150 kcal (30 min)',
    bodyEffects: ['Cool weather boosts endurance', 'Improves breathing', 'Lowers inflammation', 'Reduces stress'],
    bestTime: 'Mid-morning to afternoon',
    precautions: ['Warm up before', 'Wear light warm clothing', 'Avoid cold water', 'Stay hydrated'],
    duration: '30–45 minutes',
    difficulty: 'Light-Moderate',
    benefits: ['Stress Relief', 'Endurance', 'Mental Wellness']
  },
  'Indoor Workout': {
    icon: '💪',
    tempRange: 'Below 10°C',
    caloriesBurned: '250–350 kcal (30 min)',
    bodyEffects: ['Body burns more fat to maintain warmth', 'Increases metabolism', 'Improves flexibility', 'Enhances blood circulation'],
    bestTime: 'Afternoon (warmest time)',
    precautions: ['Warm up well', 'Keep room heated', 'Stay hydrated', 'Cool down properly'],
    duration: '30–45 minutes',
    difficulty: 'High',
    benefits: ['Muscle Building', 'Weight Loss', 'Metabolism Boost']
  },
  'Skipping': {
    icon: '🦘',
    tempRange: 'Below 10°C',
    caloriesBurned: '150–200 kcal (15 min)',
    bodyEffects: ['Excellent cardio', 'Builds leg strength', 'Improves coordination', 'Quick fat burn'],
    bestTime: 'Afternoon (warmest time)',
    precautions: ['Warm up before', 'Use proper rope', 'Wear cushioned shoes', 'Stop if dizzy'],
    duration: '10–20 minutes',
    difficulty: 'High',
    benefits: ['Weight Loss', 'Cardio', 'Coordination']
  },
  'Light Stretching': {
    icon: '🤸',
    tempRange: 'Below 10°C',
    caloriesBurned: '50–80 kcal (30 min)',
    bodyEffects: ['Improves flexibility', 'Reduces muscle stiffness', 'Increases blood flow', 'Prevents injury'],
    bestTime: 'After warming up',
    precautions: ['Warm muscles first', 'Do not bounce', 'Breathe properly', 'Go slow'],
    duration: '20–30 minutes',
    difficulty: 'Light',
    benefits: ['Flexibility', 'Relaxation', 'Injury Prevention']
  },
  'Read a Book': {
    icon: '📚',
    tempRange: 'Rainy',
    caloriesBurned: '10–20 kcal (1 hour)',
    bodyEffects: ['Reduces stress', 'Improves focus', 'Mental exercise', 'Relaxation'],
    bestTime: 'Anytime indoors',
    precautions: ['Good lighting', 'Comfortable position', 'Regular breaks', 'Hydrate'],
    duration: '1–2 hours',
    difficulty: 'Light',
    benefits: ['Relaxation', 'Mind Exercise', 'Stress Relief']
  },
  'Play Video Games': {
    icon: '🎮',
    tempRange: 'Rainy',
    caloriesBurned: '80–120 kcal (1 hour)',
    bodyEffects: ['Mental engagement', 'Improves reflexes', 'Social interaction', 'Stress relief'],
    bestTime: 'Anytime indoors',
    precautions: ['Take breaks', 'Maintain posture', 'Limit time', 'Stay hydrated'],
    duration: '1–3 hours',
    difficulty: 'Light-Moderate',
    benefits: ['Relaxation', 'Mental Wellness', 'Coordination']
  },
  'Watch Movie': {
    icon: '🎬',
    tempRange: 'Rainy',
    caloriesBurned: '70–100 kcal (2 hours)',
    bodyEffects: ['Relaxation and entertainment', 'Reduces stress', 'Emotional engagement', 'Mental break'],
    bestTime: 'Anytime indoors',
    precautions: ['Good viewing distance', 'Dim lights', 'Take breaks', 'Stretch occasionally'],
    duration: '2–3 hours',
    difficulty: 'Light',
    benefits: ['Relaxation', 'Entertainment', 'Stress Relief']
  },
  'Puzzle Time': {
    icon: '🧩',
    tempRange: 'Rainy',
    caloriesBurned: '60–90 kcal (1 hour)',
    bodyEffects: ['Improves focus and concentration', 'Mental exercise', 'Problem-solving skills', 'Stress relief'],
    bestTime: 'Anytime indoors',
    precautions: ['Good lighting', 'Comfortable table', 'Take breaks', 'Organize pieces'],
    duration: '1–3 hours',
    difficulty: 'Light-Moderate',
    benefits: ['Mental Wellness', 'Problem-Solving', 'Relaxation']
  }
};
