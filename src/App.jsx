import { AuthProvider } from "./contexts/AuthContext";
// import { Badge, Stack } from "@chakra-ui/react";
import RoutePage from "./routes";

function App() {
   return (
      <AuthProvider>
         <RoutePage />
      </AuthProvider>
   );
}

export default App;
