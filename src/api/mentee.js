import { apiPath } from "./base";

export const getAllMentee = async () => {
  const response = await fetch(`${apiPath}/mentees/list`);
  return await response.json();
};
