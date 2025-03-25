import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "localhost/meubff",
    cache: new InMemoryCache(),
});

export default client;
