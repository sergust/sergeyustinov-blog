import "server-only";

import { headers, cookies } from "next/headers";
import { cache } from "react";
import { getAuth } from "@clerk/nextjs/server";
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { NextRequest } from "next/server";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */

const createContext = cache(() => {
  return createTRPCContext({
    headers: new Headers({
      cookie: cookies().toString(),
      "x-trpc-source": "rsc",
    }),
    auth: getAuth(new NextRequest("htpp://nouse.com", { headers: headers() })),
  });
});

export const api = createCaller(createContext);
