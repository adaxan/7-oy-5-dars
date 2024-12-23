import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else if (!location.pathname.includes("/register")) {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
      return null;
    }
    return children;
  }

  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute isAuth={!!token}>
              <MainLayout>
                <Home />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;