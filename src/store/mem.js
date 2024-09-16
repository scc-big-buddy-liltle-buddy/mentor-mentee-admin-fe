import { create } from "zustand";
import { getAllMentee } from "../api/mentee";
import { getAllMentors, getMentorByID } from "../api/mentor";

export const useMenteeStore = create((set, get) => ({
  mentees: {},
  isError: false,
  isLoading: false,
  getMenteeByID: (id) => {
    // Find mentor by id in mentors
    const mentee = get().mentees.find((mentee) => mentee.id === id);
    if (!mentee) return {};

    return mentee;
  },
  loadMentee: async () => {
    try {
      set({ isLoading: true });
      const data = await getAllMentee();
      set({ mentees: data });
      set({ isLoading: false });
    } catch (error) {
      set({ isError: true });
    }
  },
}));

export const useMentorStore = create((set, get) => ({
  mentors: {},
  isLoading: false,
  getMentorByID: (id) => {
    // Find mentor by id in mentors
    const mentor = get().mentors.find((mentor) => mentor.id === id);
    if (!mentor) return {};

    return mentor;
  },
  isError: false,
  loadMentor: async () => {
    try {
      set({ isLoading: true });
      const data = await getAllMentors();
      set({ mentors: data });
      set({ isLoading: false });
    } catch (error) {
      set({ isError: true });
    }
  },
}));
