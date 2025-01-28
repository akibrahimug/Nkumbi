import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Footer } from "@/components/layout/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ugandan Farmer Dashboard",
  description: "A mobile-friendly dashboard for Ugandan farmers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
