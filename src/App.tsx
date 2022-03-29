import { ApolloProvider } from '@apollo/client';
import BigNumber from 'bignumber.js';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { getApolloClient } from './clients/apollo.client';
import { ConnectedWeb3 } from './contexts/connectedWeb3';
import { Web3Provider } from './contexts/web3';
import { Main } from './features/main/components/main';

const App: React.FC = () => {
  const apolloClient = React.useMemo(() => getApolloClient(), [])
  
  // Almost never return exponential notation
  BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
  return (
      <SnackbarProvider maxSnack={3}>
        <ApolloProvider client={apolloClient}>
          <Web3Provider>
            <ConnectedWeb3>
              <Main /> 
            </ConnectedWeb3>
          </Web3Provider>
        </ApolloProvider> 
      </SnackbarProvider>
  );
}
export default App;