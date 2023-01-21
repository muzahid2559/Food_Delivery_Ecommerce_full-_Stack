import Layout from "./components/Layout/Layout";
import useAuth from "./hooks/useAuth";

function App() {
  useAuth();
  return <Layout />;
}

export default App;
