import NextAuth from "next-auth";

import type { Auth } from "./types";
import { authConfig } from "./config";

export type { Session } from "next-auth";

const { handlers, auth: defaultAuth, signIn, signOut } = NextAuth(authConfig);
// Fix for typing error
const auth: Auth = defaultAuth;

export { handlers, auth, signIn, signOut };

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";
