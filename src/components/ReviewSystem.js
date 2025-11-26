import React, { useState, useEffect } from 'react';

const ReviewSystem = ({ language }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ place: '', rating: 5, comment: '' });

  useEffect(() => {
    const saved = localStorage.getItem('travelReviews');
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  const addReview = () => {
    if (newReview.place && newReview.comment) {
      const review = { ...newReview, id: Date.now(), date: new Date().toLocaleDateString() };
      const updated = [...reviews, review];
      setReviews(updated);
      localStorage.setItem('travelReviews', JSON.stringify(updated));
      setNewReview({ place: '', rating: 5, comment: '' });
    }
  };

  const deleteReview = (id) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem('travelReviews', JSON.stringify(updated));
  };

  const avgRating = reviews.length > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <div className="component-card">
      <h2>⭐ Rating & Review System</h2>

      <div className="review-stats">
        <div className="stat-item">
          <span>Average Rating</span>
          <strong>{avgRating} / 5</strong>
        </div>
        <div className="stat-item">
          <span>Total Reviews</span>
          <strong>{reviews.length}</strong>
        </div>
      </div>

      <div className="review-form">
        <h3>Add Your Review</h3>
        <input
          type="text"
          placeholder="Place name"
          value={newReview.place}
          onChange={(e) => setNewReview({ ...newReview, place: e.target.value })}
          className="input-field"
        />
        
        <div className="rating-input">
          <label>Rating</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map(i => (
              <span
                key={i}
                onClick={() => setNewReview({ ...newReview, rating: i })}
                className={`star ${i <= newReview.rating ? 'active' : ''}`}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Your review..."
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="input-field"
          rows="4"
        />

        <button onClick={addReview} className="btn btn-primary">Add Review</button>
      </div>

      <div className="reviews-list">
        <h3>All Reviews</h3>
        {reviews.length > 0 ? (
          reviews.reverse().map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <h4>{review.place}</h4>
                <span className="review-date">{review.date}</span>
              </div>
              <div className="review-rating">
                {'⭐'.repeat(review.rating)} ({review.rating}/5)
              </div>
              <p>{review.comment}</p>
              <button onClick={() => deleteReview(review.id)} className="btn btn-small btn-danger">Delete</button>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;
