import React from 'react';

export default function App() {
  return (
    <div>
      <h1>URL Shortening Microservice</h1>
      <div className="bodyContent">
      <p>
        This API microservice will shorten URLs. The shortened URLs are stored in a MongoDB database.
      </p>
      <p>
        Using the shortened URL will redirect you to the URL associated with the short URL located in the database.
      </p>
      <p>
        This project was build with Node.js, Express, MongoDB, and uses a React.js front end.
        To learn more about this project, pleasde visit the Github project page.
      </p>

      </div>
    </div>
  );
}