import React, { useState } from 'react';

const RatingPage: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send the rating and comment to the backend API
    fetch('/api/ratings', {
      method: 'POST',
      body: JSON.stringify({ rating, comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
        // Reset the form
        setRating(null);
        setComment('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Rate Kremsnita's in Bled</h1>
      <div className="border border-gray-300 p-4 rounded-md">
        <p className="text-lg font-semibold">Rate your Bled kremsnita</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center mb-4">
            <span className="mr-2">Rating:</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="mr-1">
                  <input
                    type="radio"
                    value={value}
                    checked={rating === value}
                    onChange={() => handleRatingChange(value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block font-semibold mb-1">
              Comment:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={!rating || !comment}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingPage;
