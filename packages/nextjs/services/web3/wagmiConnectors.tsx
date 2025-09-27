import type { CreateConnectorFn } from "wagmi";
import { walletConnect } from "wagmi/connectors";
import { injected, metaMask } from "wagmi/connectors";
import scaffoldConfig from "~~/scaffold.config";

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors: readonly CreateConnectorFn[] = [
  injected(),
  metaMask(),
  walletConnect({
    projectId: scaffoldConfig.walletConnectProjectId,
    metadata: {
      name: "Simple NFT Example",
      description: "Built with Scaffold-ETH 2",
      url: "https://speedrunethereum.com",
      icons: ["https://avatars.githubusercontent.com/u/55535804?s=200&v=4"],
    },
  }),
];
