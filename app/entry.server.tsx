import { handleRequest } from "@vercel/react-router/entry.server";
import type { EntryContext } from "react-router";
import { RouterContextProvider } from "react-router";
import { I18nextProvider } from "react-i18next";
import type { ReactNode } from "react";
import {getInstance} from "~/middleware/i18next";

function createRouterContext(): RouterContextProvider {
  return new RouterContextProvider(new Map());
}

export async function getLoadContext(existingContext?: RouterContextProvider) {
  const routerContext = existingContext ?? createRouterContext();
  const i18n = await getInstance(routerContext);
  (routerContext as any).set("i18n", i18n);
  return routerContext;
}

export default async function handleVercelRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    entryContext: EntryContext,
    routerContext?: RouterContextProvider,
) {
  const context = routerContext ?? createRouterContext();
  const loadContext = await getLoadContext(context);

  const i18n = (loadContext as any).get("i18n");

  return handleRequest(
      request,
      responseStatusCode,
      responseHeaders,
      entryContext,
      {
        context: loadContext,
        wrapWithApp: (children: ReactNode) => (
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        ),
      },
  );
}
