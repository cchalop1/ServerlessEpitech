import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Conversations from "./components/Conversations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Home />
            </AuthProvider>
          }
        ></Route>
        <Route
          path="profile"
          element={
            <AuthProvider>
              <Profile />
            </AuthProvider>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="conversations" element={
          <AuthProvider>
            <Conversations />
          </AuthProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
