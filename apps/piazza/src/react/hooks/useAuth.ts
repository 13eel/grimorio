import type { SessionUser } from "node_modules/@pkg/auth/src/config";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";

import { getUser } from "~/react/actions/auth";

export const userAtom = atom<SessionUser | null>(null);

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const updateUser = async () => {
      setUser(await getUser());
    };
    void updateUser();
  }, [setUser]);

  return user;
};
