import { create } from 'zustand';

interface UserState {
  username: string;
  email: string;
  profileImage: File | null;
  setUser: (user: { username: string; email: string; profileImage: File | null }) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  username: '',
  email: '',
  profileImage: null,
  setUser: (user) => set(user),
  clearUser: () => set({ username: '', email: '', profileImage: null }),
}));

export default useUserStore;
