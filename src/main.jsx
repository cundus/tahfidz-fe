import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { fonts } from "./utils/theme.js";
import { tabs } from "./utils/tabs.js";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider
        theme={extendTheme({
          fonts: fonts,
          components: {
            Tabs: tabs,
          },
        })}
      >
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
