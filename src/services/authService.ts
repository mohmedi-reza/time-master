import Cookies from "js-cookie";

export const checkAuth = () => {
  const token = Cookies.get("accessToken");
  return !!token;
};
