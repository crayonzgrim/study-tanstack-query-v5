import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Todos } from "./components";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Todos />
      </QueryClientProvider>
    </div>
  );
}

export default App;
