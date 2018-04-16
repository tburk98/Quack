import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login/login';
import Register from './components/Login/register';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AUTH_TOKEN } from './constants'


const httpLink = createHttpLink({
  uri: 'http://endor-vm2.cs.purdue.edu:4000/graphql',
});

const authToken = localStorage.getItem(AUTH_TOKEN);
//localStorage.setItem(AUTH_TOKEN, "");

const middlewareLink = new ApolloLink((operation, forward) => {
  	if (authToken) {
	  operation.setContext({
	    headers: {
        type: 'instructor',
	      authorization: authToken
	    }
	  });
	}
	console.log(operation.getContext());
  return forward(operation)
})



const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache()
});

console.log("TOKEN: " + authToken);

ReactDOM.render(
<ApolloProvider client={client}>
    <Router>
        <Switch>
            <Route exact path="/auth/login" component={Login}/> 
            <Route exact path="/auth/register" component={Register}/> 
            <Route component={App}/>
        </Switch>
    </Router>
</ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
