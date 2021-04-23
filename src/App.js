import { useOvermind } from "./store";
import Auth from "./pages/auth/Auth";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
  const { state } = useOvermind();
  return <>{state.user.user ? <ProtectedRoutes /> : <Auth />}</>;
}

export default App;
