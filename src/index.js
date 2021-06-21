import ApolloClient from 'apollo-boost';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

// initialize a GraphQL client
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com'
});

// write a GraphQL query that asks for names and codes for all countries
const GET_COUNTRIES = gql`
  {
    countries {
        name
        code
        emoji
        currency
        languages {
            code
            name
        }
    }
  }
`;

// create a component that renders an API data-powered select input
class CountrySelect extends Component {
  state = {
    country: 'IN'
  };

  // set the selected country to the new input value
  onCountryChange = event => {
    this.setState({country: event.target.value});
  };

  render() {
    return (
      <Query query={GET_COUNTRIES} client={client}>
        {({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;
          console.log(data)
          return (
            <div>
                <center>
                    <h2>Countries With GraphQL</h2>
                </center>
                {data.countries.map(country => (
                   <div class="panel panel-primary">
                   <div class="media-left">
                     <img src={`https://www.countryflags.io/${country.code}/flat/64.png`} class="media-object"/>
                   </div>
                   <div class="media-body">
                     <h4 class="media-heading">{country.name}</h4>
                     <p>Currency: {country.currency}</p> 
                     <p>Languages: {country.languages.name}</p>   
                   </div>
                 </div>
                           
                ))}
            </div>
           
          );
        }}
      </Query>
    );
  }
}

ReactDOM.render(<CountrySelect />, document.getElementById('root'));