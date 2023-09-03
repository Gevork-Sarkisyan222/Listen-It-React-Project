import React from 'react';

function NotFound() {
  return (
    <div className="Not-Found-Main">
      <div className="not-found-wrapper">
        <h2>Такой страницы не существует в Listen It</h2>
        <h1>404 not found</h1>
        <img
          src="https://kinsta.com/wp-content/uploads/2021/05/xampp-http-error-404-the-requested-resource-is-not-found-featured-image.jpg"
          alt="not-found-image"
        />
      </div>
    </div>
  );
}

export default NotFound;
