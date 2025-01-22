import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Footer } from "./components/Footer";
// import { Provider } from "react-redux";
// import store from "../store";
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
        {/* <Provider store={store}> */}
        <main className="flex-grow">{children}</main>
        <Footer />
        {/* </Provider> */}
      </body>
    </html>
  );
}
