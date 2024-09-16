import { apiPath } from "./base";

export const getMatchByUID = async (uid) => {
  const response = await fetch(`${apiPath}/match/get/${uid}`);
  return await response.json();
};

export const getAllMatches = async () => {
  const response = await fetch(`${apiPath}/match/list`);
  return await response.json();
};

export const createMatch = async (matchName) => {
  const response = await fetch(`${apiPath}/match/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matchName }),
  });
  return await response.json();
};

export const updateMatchName = async (uid, newName) => {
  const response = await fetch(`${apiPath}/match/update/match_name/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, newName }),
  });
  return await response.json();
};
