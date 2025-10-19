import "@/styles/globals.css";
import { Patrick_Hand } from "next/font/google";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cute",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={patrickHand.className}>
      <Component {...pageProps} />
    </div>
  );
}
