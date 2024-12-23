import { apiPath } from "./base";

const base = `${apiPath}/auth`;

export const login = async (email, password) => {
  const response = await fetch(`${base}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status !== 200) {
    return { status: response.status };
  }
  let data = await response.json();
  return {
    status: response.status,
    data,
  };
};

export const logout = async () => {
  const response = await fetch(`${base}/logout`, {
    method: "POST",
  });
  return await response.json();
};
