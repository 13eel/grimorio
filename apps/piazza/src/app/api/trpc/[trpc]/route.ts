import type { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@pkg/api";

import { env } from "~/env";

// import { auth } from "@acme/auth";

// export const runtime = "edge";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
const setCorsHeaders = (res: Response) => {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
};

export const OPTIONS = () => {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
};

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });
// const handler = auth(async (req) => {
//   const response = await fetchRequestHandler({
//     endpoint: "/api/trpc",
//     router: appRouter,
//     req,
//     createContext: () =>
//       createTRPCContext({
//         session: req.auth,
//         headers: req.headers,
//       }),
//     onError({ error, path }) {
//       console.error(`>>> tRPC Error on '${path}'`, error);
//     },
//   });

//   setCorsHeaders(response);
//   return response;
// });

export { handler as GET, handler as POST };
