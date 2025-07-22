import { createContext, useState } from "react";

import type User from "../../../src/types/UserType";

export type AuthContextType = {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  logout: () => void;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const isAdmin = user?.role_id === 3;
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
