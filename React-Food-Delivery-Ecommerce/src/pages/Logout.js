import { useState, useEffect } from "react";
import storage from "../utils/storage";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { authenticated } = useAuth();
  const msg = storage.get("message");
  const navigate = useNavigate();
  const [message, setMessage] = useState(msg);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (authenticated) {
      storage.remove("authTokens");
      window.location.reload();
      navigate("/");
    }
    if (message) {
      storage.remove("auth");
    }
  }, []);
};

export default Logout;
