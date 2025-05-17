import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { Metadata } from "next";

import Header from "@/components/common/header/Header";
import theme from "@/utils/theme";
import QueryProvider from "@/contexts/queryProviders";

export const metadata: Metadata = {
  title: "Health Worker Dashboard",
  description: "Manage and submit healthcare forms efficiently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryProvider>
              <Header />
              <main>{children}</main>
            </QueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
