import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
const appCss = "/assets/styles-BKDNeAEJ.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
  }, [error]);
  const isDev = false;
  const message = error?.message || "An unknown error occurred";
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-lg text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg bg-muted p-4 text-left", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Error" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 break-words font-mono text-sm text-foreground", children: message }),
      isDev
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$1 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lofi Study Nook" },
      {
        name: "description",
        content: "A cozy study dashboard with lofi radio, ambient sound mixer, YouTube player, pomodoro, doodle pad and boredom busters."
      },
      { property: "og:title", content: "Lofi Study Nook" },
      {
        property: "og:description",
        content: "Lofi radio, ambient sounds, pomodoro, doodle pad and other tiny tools for focus and productive procrastination."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
const THEME_BOOT = `try{var t=localStorage.getItem('study-nook-theme')||'jdm';document.documentElement.classList.add('theme-'+t)}catch(e){document.documentElement.classList.add('theme-jdm')}`;
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(HeadContent, {}),
      /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: THEME_BOOT } })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$1.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const $$splitComponentImporter = () => import("./index-B6_teQbJ.js");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Lofi Study Nook — focus, chill, procrastinate on purpose"
    }, {
      name: "description",
      content: "A cozy study dashboard: lofi radio, an ambient sound mixer, YouTube player, doodle pad, dice, reaction test, pomodoro, and fun distractions."
    }, {
      property: "og:title",
      content: "Lofi Study Nook"
    }, {
      property: "og:description",
      content: "Lofi radio, ambient sounds, YouTube, doodle pad, dice, reaction test and more — one warm little study nook."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }],
    // Warm up YouTube's TLS + DNS in idle time so hitting play on a station
    // starts the stream noticeably faster (skips ~200-500ms of handshakes).
    links: [{
      rel: "preconnect",
      href: "https://www.youtube.com",
      crossOrigin: ""
    }, {
      rel: "preconnect",
      href: "https://www.youtube-nocookie.com",
      crossOrigin: ""
    }, {
      rel: "preconnect",
      href: "https://i.ytimg.com",
      crossOrigin: ""
    }, {
      rel: "preconnect",
      href: "https://s.ytimg.com",
      crossOrigin: ""
    }, {
      rel: "dns-prefetch",
      href: "https://googlevideo.com"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
