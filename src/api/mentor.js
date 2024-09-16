import { apiPath } from "./base";

// getMentorByID
export const getMentorByID = async (id) => {
  const response = await fetch(`${apiPath}/mentors/${id}`);
  return await response.json();
};

export const getAllMentors = async () => {
  const response = await fetch(`${apiPath}/mentors/list`);
  return await response.json();
};
