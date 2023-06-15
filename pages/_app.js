import '@/styles/globals.css'

// pages/_app.js
import { Provider } from 'react-redux';
import { initializeStore } from './store/store';




function MyApp({ Component, pageProps }) {
  const store = initializeStore();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

