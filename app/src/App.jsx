import { ThemeProvider } from "@mui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { AppRoutes } from "./pages/Routes";
import { persistor } from "./store";
import theme from "./themes";

const queryClient = new QueryClient();

function App() {
  return (
    <PersistGate persistor={persistor} loading={<div>loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          theme={theme({
            isOpen: "dashboard",
          })}
        >
          <BrowserRouter>
            <AppRoutes />
            <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </PersistGate>
  );
}

export default App;
