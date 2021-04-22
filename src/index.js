import React from 'react';
import './index.css';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
});

function ApolloLaunches() {
  const { loading, error, data } = useQuery(gql`
  {
    launches(limit: 5) {
      id
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launches.map(({ id, launch_date_utc, launch_success, rocket, links, details }) => (
    <div key={id}>
      <ul>
        <li>Date de lancement UTC: {launch_date_utc}</li>
        <li>Statut du lancement: {launch_success}</li>
        <li>Nom de la fusée: {rocket.rocket_name}</li>
        <li>Lien YouTube: {links.video_link}</li>
        <li>Détails: {details}</li>
      </ul>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <ApolloLaunches />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
