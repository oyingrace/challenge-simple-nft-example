"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";

export const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const [mounted, setMounted] = useState(false);
  const [showWalletList, setShowWalletList] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="btn btn-primary btn-sm">
        <div className="loading loading-spinner loading-sm"></div>
      </div>
    );
  }

  if (!isConnected || !address) {
    return (
      <div className="dropdown dropdown-end">
        <button onClick={() => setShowWalletList(!showWalletList)} className="btn btn-primary btn-sm">
          Connect Wallet
        </button>
        {showWalletList && (
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 z-50">
            <li className="menu-title">
              <span>Choose Wallet</span>
            </li>
            {connectors.map(connector => (
              <li key={connector.uid}>
                <button
                  onClick={() => {
                    connect({ connector });
                    setShowWalletList(false);
                  }}
                  className="btn btn-ghost btn-sm w-full justify-start"
                >
                  <Image
                    src={`https://api.iconify.design/logos:${connector.name.toLowerCase().replace(/\s+/g, "-")}.svg`}
                    alt={connector.name}
                    width={16}
                    height={16}
                    className="mr-2"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {connector.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-primary btn-sm">
        {balance?.formatted ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : "Connected"}
        <svg className="w-2 h-2 ml-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52">
        <li className="menu-title">
          <span>Account</span>
        </li>
        <li>
          <span className="text-xs font-mono">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </li>
        <li>
          <button onClick={() => disconnect()} className="btn btn-ghost btn-sm w-full">
            Disconnect
          </button>
        </li>
      </ul>
    </div>
  );
};
