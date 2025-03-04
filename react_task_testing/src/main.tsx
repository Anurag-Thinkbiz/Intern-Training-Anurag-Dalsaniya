import { createRoot } from "react-dom/client";
import "./index.css";
import "./translation/i18config.ts";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store, { persistedStore } from "./redux/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./App.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <AppRoutes></AppRoutes>
          <ToastContainer></ToastContainer>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </>
);
