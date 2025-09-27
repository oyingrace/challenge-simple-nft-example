import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "~~/components/ThemeProvider";
import { WalletConnectProvider } from "~~/components/WalletConnectProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata = getMetadata({
  title: "Simple NFT Example | SpeedRunEthereum",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning className={`${spaceGrotesk.variable} font-space-grotesk`}>
      <body>
        <ThemeProvider enableSystem>
          <WalletConnectProvider>{children}</WalletConnectProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
