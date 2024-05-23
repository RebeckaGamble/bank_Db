import "./globals.css";
import Footer from "./components/Footer";
import Providers from "./Providers";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./components/header/Nav";

export const metadata = {
  title: "Bank | Home",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen">
        <AuthProvider>
          <Providers>
            <Nav />
            <div className="flex flex-col h-auto min-h-[calc(100vh-220px)]">
              {children}
            </div>
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}