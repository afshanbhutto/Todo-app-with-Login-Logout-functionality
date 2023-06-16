import "@/styles/globals.css";

// pages/_app.js
import { Provider } from "react-redux";
import { initializeStore } from "../store/store";

const store = initializeStore();

function MyApp({ Component, pageProps }) {
  

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
