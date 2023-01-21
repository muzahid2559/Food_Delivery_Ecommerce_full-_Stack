import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import storage from "../utils/storage";
import { setAuthenticated, setUserType } from "../store/auth/authSlice";

const CheckRefreshToken = () => {
  const authTokens = storage.get("authTokens");
  const dispatch = useDispatch();
  if (authTokens) {
    const user = jwt_decode(authTokens?.refresh);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      dispatch(setUserType(user.user_type));
      dispatch(setAuthenticated(true));
      return true;
    } else {
      storage.remove("authTokens");
      dispatch(setUserType(undefined));
      dispatch(setAuthenticated(false));
      return false;
    }
  }
};

export default function useAuth() {
  const { user, userType } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const authenticated = CheckRefreshToken();
  const login = () => {
    if (authenticated) {
      navigate("/");
    } else {
      storage.remove("AuthToken");
      navigate("/");
    }
  };

  const logout = () => {
    storage.remove("AuthToken");
    window.location.reload();
  };

  return { user, userType, authenticated, login, logout };
}
