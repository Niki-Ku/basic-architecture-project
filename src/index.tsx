import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./tailwind.output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/index";
import { firebaseConfig } from "./config/firebaseConfig";
import { getFirestore, collection } from 'firebase/firestore'
import { initializeApp } from "firebase/app"; 
import "./i18n"

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const colRef = collection(db, 'test');

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router> 
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
