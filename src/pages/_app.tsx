import { type Session } from "next-auth";
import { type AppType } from "next/app";

import { Layout } from "@/components/layout";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { api } from "@/utils/api";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
        <ShadcnToaster />
      </Layout>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
