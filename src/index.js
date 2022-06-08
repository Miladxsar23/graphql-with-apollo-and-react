import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import httpLink from "./api";
import "./index.scss";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";

/*configuration cache for apollo client*/
const cache = new InMemoryCache();
/*configuration apollo client*/
const client = new ApolloClient({
  link: httpLink,
  cache,
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
