import React, { useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { GET_WEATHER_QUERY } from "../graphql/queries";

const Home = () => {
  const [citySearched, setCitySearched] = useState("");
  const nameRef = useRef();

  const [getWeather, { loading, data, error }] = useLazyQuery(
    GET_WEATHER_QUERY,
    {
      variables: { name: citySearched },
    }
  );

  function submitHandler(e) {
    e.preventDefault();
    setCitySearched(nameRef.current.value);
    getWeather();
  }

  if (loading) return <h1 className="loading">loading ...</h1>;
  if (error) return <h1 className="error">{error.message}</h1>;

  return (
    <div className="home">
      <h1>🌦️ Weather App with GraphQL</h1>

      <form onSubmit={submitHandler}>
        <input type="text" placeholder="City name..." ref={nameRef} />
        <button type="submit">Search</button>
      </form>

      <div className="weather-container">
        {data && (
          <section className="weather-card">
            <img
              src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.getCityByName.weather.summary.icon}.svg`}
              alt="icon"
            />
            <h2>{data.getCityByName.name}</h2>
            <p>
              <strong>Temperature: </strong>
              {data.getCityByName.weather.temperature.actual}
            </p>
            <p>
              <strong>Description: </strong>
              {data.getCityByName.weather.summary.description}
            </p>
            <p>
              <strong>Wind Speed: </strong>
              {data.getCityByName.weather.wind.speed}
            </p>
            <p>
              <strong>Humidity: </strong>
              {data.getCityByName.weather.clouds.humidity}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
