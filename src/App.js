import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { UserForm } from './containers/UserForm';
import { Users } from './containers/Users';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <UserForm />
        <Users />
      </ApolloProvider>
    </>
  );
}

export default App;
