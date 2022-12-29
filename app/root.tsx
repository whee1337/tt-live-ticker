import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import SideNavbar from "./components/sidenavbar/sidenavbar";
import {MantineProvider } from '@mantine/core';
import themeTTC from "./utils/themeTTC";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
      <MantineProvider
      theme={themeTTC}
    >
        <SideNavbar/>
        <div style={{marginLeft:"81px"}}>
        <Outlet />
        </div>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
