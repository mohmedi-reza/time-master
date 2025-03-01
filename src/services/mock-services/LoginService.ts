import Cookies from "js-cookie";

export const loginUser = () => {
  Cookies.set(
    "accessToken",
    "4555555555555555555555555888888888888888888888888888",
    {
      expires: 7,
      path: "/",
    }
  );
};

export const logoutUser = () => {
  Cookies.remove("accessToken", { path: "/" });
};
