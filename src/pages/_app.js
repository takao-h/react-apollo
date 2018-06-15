import React from "react";
import {Container} from "next/app";
import {ApolloClient} from "apollo-boost";
import {HttpLink} from "apollo-boost";
import {InMemoryCache} from "apollo-boost";
import fetch from "isomorphic-unfetch";
import {ApolloProvider} from "react-apollo";

const IS_BROWSER = !!process.browser

if (!IS_BROWSER) {
  global.fetch = fetch
}

const URI_ENDPOINT = 'http://lcoalhost:3001/graphql'
const createClinet = (initialState) => {
  return new ApolloClient({
    connectToDevTools: IS_BROWSER,
    ssrMode: !IS_BROWSER,
    link: mew HttpLink({
                         uri: URI_ENDPOINT,
                         credential: 'same-origin'
                       }),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

const client = createClient();

export default props => {
  const {Component, pageProps, apolloClient} = props
  return(
    <Container>
      <ApolloProvider client={client}>
        <Component {...pageProps}/>
      </ApolloProvider>
    </Container>
  )
}