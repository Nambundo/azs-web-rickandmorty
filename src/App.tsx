import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/graphql/apolloClient';
import { SearchProvider } from '@/context/SearchContext';
import { Layout } from '@/components/layout/Layout';
import { AppRoutes } from '@/routes/AppRoutes';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <SearchProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </SearchProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
