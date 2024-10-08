import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import Layout from "../components/Layout";
import { WorkoutsContextProvider } from "@/context/WorkoutContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WorkoutsContextProvider>
      <Layout>
        <main className={`${inter.className}`}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </WorkoutsContextProvider>
  );
}
