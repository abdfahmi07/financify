import cookies from "js-cookie";

const authNamespace = import.meta.env.VITE_AUTH_NAMESPACE;

export const setAuthCookie = (payloads, expires) => {
  cookies.set(authNamespace, payloads, {
    expires,
  });
};

export const getAuthCookie = () => {
  const userAuth = cookies.get(authNamespace);
  return userAuth;
};

export const removeAuthCookie = () => {
  cookies.remove(authNamespace);
};
