import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import QueryProvider from "./query/QueryProvider.tsx";
import store from "./redux/store.ts";
import router from "./routes/router.tsx";
import GlobalStyle from "./styles/GlobalStyle.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <QueryProvider>
        <RouterProvider router={router} />
        {/* <App /> */}
      </QueryProvider>
    </Provider>
  </React.StrictMode>
);
