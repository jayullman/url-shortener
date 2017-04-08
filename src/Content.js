import React from 'react';

export default function App() {
  return (
    <div>
      <div className="bodyContent">
        <p>
          This API microservice will shorten a valid URL. The shortened URLs are stored in a MongoDB database. Use the <code>/new/</code> endpoint
        to create a new short url.
      </p>
        <h3>Usage:</h3>
        <code>
          www.heroku.com/new/www.freecodecamp.com
        </code>
        <p>
          The server will return a JSON object in the following format:
        </p>
        <code>
          {"{ originalUrl: www.freecodecamp.com, shortUrl: hjetgtbpg }"}
        </code>
        <p>
          Using the shortened URL will redirect you to the URL associated with the short URL located in the database:
      </p>
        <code>
          www.heroku.com/hjetgtbpg
        </code>
        <p>
          This project was build with Node.js, Express, MongoDB, and uses a React.js front end.
        To learn more about this project, pleasde visit the <a href="https://github.com/libeja/url-shortener" target="_blank">
        Github{'\u00A0'}project{'\u00A0'}page</a>.
      </p>

      </div>
    </div>
  );
}