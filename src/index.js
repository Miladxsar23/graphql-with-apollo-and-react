import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  from,
} from "@apollo/client";
import httpLink, { errorLink, persistedQueryLink, roundTripLink, retryLink } from "./apollo-links";
import cache from "./apollo-cache";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
/*configuration apollo client*/
const client = new ApolloClient({
  link: from([roundTripLink, persistedQueryLink, errorLink, retryLink, httpLink]),
  cache,
  connectToDevTools: true,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
