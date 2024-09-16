import { create } from "zustand";
import { getAllMatches, getMatchByUID, updateMatchName } from "../api/match";
import { useMenteeStore, useMentorStore } from "./mem";

export const useMatchStore = create((set, get) => ({
  matches: [],
  isLoading: false,
  isError: false,
  getMatchByID: (matchId) => {
    let matches = get().matches;
    let match = matches.find((match) => match.uid === matchId);
    return match;
  },
  getGroupByMatchAndGroupId: (matchId, groupId) => {
    return get()
      .matches.find((item) => item.uid === matchId)
      .groups.find((group) => group.id.toString() == groupId);
  },
  updateMatchName: async (uid, newName) => {
    try {
      let response = await updateMatchName(uid, newName);
      let newMatchData = get().matches.map((match) => {
        if (match.uid === uid) {
          match.matchName = newName;
        }
        return match;
      });
      set({ matches: newMatchData });
      return response;
    } catch (error) {
      return { status: "error" };
    }
  },

  loadMatchData: async () => {
    try {
      set({ isLoading: true });
      let matchData = await getAllMatches();
      let newMatchData = matchData.map((match) => {
        match.groups = match.groups.map((group) => {
          group.mentees = group.mentees.map((mentee) => {
            mentee.menteeData = useMenteeStore
              .getState()
              .getMenteeByID(mentee.menteeId);
            return mentee;
          });
          group.mentor = useMentorStore
            .getState()
            .getMentorByID(group.mentorId);
          return group;
        });
        return match;
      });

      // matchData.groups = matchData.groups.map((group) => {
      //   alert(JSON.stringify(group));
      //   // group.mentees = group.mentees.map((mentee) =>
      //   //   useMenteeStore().getMenteeByID(mentee)
      //   // );
      //   return group;
      // });

      set({ matches: newMatchData });
      set({ isLoading: false });
    } catch (error) {
      set({ isError: true });
    }
  },
}));
