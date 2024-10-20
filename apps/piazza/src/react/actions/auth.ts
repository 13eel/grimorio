"use server";

import { auth, signIn as authSignIn, signOut as authSignOut } from "@pkg/auth";

export async function signIn() {
  await authSignIn("discord");
}

export async function signOut() {
  await authSignOut();
}

export async function getSession() {
  return await auth();
}

export async function getUser() {
  const session = await auth();
  return session?.user ?? null;
}
