import React, { useState } from 'react';

const EventsCalendar = ({ language }) => {
  const [selectedMonth, setSelectedMonth] = useState(11); // November

  const events = {
    'January': [
      { date: 15, name: 'Pongal Festival', location: 'Tamil Nadu', type: 'Festival' },
      { date: 26, name: 'Republic Day', location: 'All India', type: 'National' },
    ],
    'February': [
      { date: 14, name: 'Valentine\'s Day', location: 'Nationwide', type: 'Event' },
      { date: 23, name: 'Maha Shivaratri', location: 'Temples', type: 'Festival' },
    ],
    'March': [
      { date: 8, name: 'International Women\'s Day', location: 'Nationwide', type: 'Event' },
      { date: 25, name: 'Holi Festival', location: 'All India', type: 'Festival' },
    ],
    'April': [
      { date: 14, name: 'Baisakhi Festival', location: 'North India', type: 'Festival' },
      { date: 17, name: 'Ram Navami', location: 'Temples', type: 'Festival' },
    ],
    'May': [
      { date: 1, name: 'International Labor Day', location: 'Nationwide', type: 'Event' },
    ],
    'June': [
      { date: 21, name: 'Summer Solstice', location: 'Worldwide', type: 'Event' },
    ],
    'July': [
      { date: 17, name: 'Muharram', location: 'Muslim Communities', type: 'Festival' },
    ],
    'August': [
      { date: 15, name: 'Independence Day', location: 'All India', type: 'National' },
      { date: 26, name: 'Janmashtami', location: 'All India', type: 'Festival' },
    ],
    'September': [
      { date: 16, name: 'Milad-un-Nabi', location: 'Muslim Communities', type: 'Festival' },
    ],
    'October': [
      { date: 2, name: 'Gandhi Jayanti', location: 'All India', type: 'National' },
      { date: 24, name: 'Diwali Festival', location: 'All India', type: 'Festival' },
    ],
    'November': [
      { date: 1, name: 'Diwali Celebrations', location: 'All India', type: 'Festival' },
      { date: 5, name: 'Guru Nanak Jayanti', location: 'Sikh Temples', type: 'Festival' },
    ],
    'December': [
      { date: 25, name: 'Christmas', location: 'Nationwide', type: 'Festival' },
      { date: 31, name: 'New Year Eve', location: 'Nationwide', type: 'Event' },
    ],
  };

  const months = Object.keys(events);
  const currentMonthEvents = events[months[selectedMonth]] || [];

  const blogPosts = [
    {
      title: '10 Hidden Gems of Kerala',
      author: 'Travel Blogger',
      date: 'Nov 20, 2024',
      excerpt: 'Discover lesser-known backwaters and beaches...',
      likes: 256,
    },
    {
      title: 'Budget Travel Guide to Rajasthan',
      author: 'Budget Explorer',
      date: 'Nov 15, 2024',
      excerpt: 'Travel Rajasthan on a shoestring budget...',
      likes: 189,
    },
    {
      title: 'Adventure Sports in Himachal Pradesh',
      author: 'Adventure Seeker',
      date: 'Nov 10, 2024',
      excerpt: 'Experience thrilling activities in the mountains...',
      likes: 342,
    },
  ];

  return (
    <div className="component-card">
      <h2>📅 Events Calendar & Travel Blog</h2>

      <div className="calendar-section">
        <h3>📆 Festival & Events Calendar</h3>

        <div className="month-selector">
          <button
            onClick={() => setSelectedMonth((prev) => (prev - 1 + 12) % 12)}
            className="btn btn-small"
          >
            ← Previous
          </button>
          <span className="current-month">{months[selectedMonth]}</span>
          <button
            onClick={() => setSelectedMonth((prev) => (prev + 1) % 12)}
            className="btn btn-small"
          >
            Next →
          </button>
        </div>

        <div className="events-list">
          {currentMonthEvents.length > 0 ? (
            currentMonthEvents.map((event, idx) => (
              <div key={idx} className="event-card">
                <div className="event-date">{event.date}</div>
                <div className="event-details">
                  <h4>{event.name}</h4>
                  <p>📍 {event.location}</p>
                  <span className={`event-type ${event.type.toLowerCase()}`}>{event.type}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No major events this month</p>
          )}
        </div>
      </div>

      <div className="blog-section">
        <h3>📝 Travel Stories & Blog</h3>
        <div className="blog-grid">
          {blogPosts.map((post, i) => (
            <div key={i} className="blog-card">
              <h4>{post.title}</h4>
              <p className="blog-author">By {post.author}</p>
              <p className="blog-date">{post.date}</p>
              <p>{post.excerpt}</p>
              <div className="blog-footer">
                <span>❤️ {post.likes}</span>
                <button className="btn btn-small">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
