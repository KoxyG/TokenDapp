import * as React from "react";
import { toast } from "react-toastify";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import Image from "next/image";

const Home = () => {
  const wallet = useWallet();
  const { connection } = useConnection();


  return (
    <main className="min-h-screen  text-white">
      <div>
        <div className="">
        {!wallet.connected ? (
          <div>
            
            <div className="grid place-content-end pt-6 pr-6">
              <button className="bg-gradient-to-r from-[#35d6ab] to-[#cd32fc] rounded-md  sm:px-[3px] sm:py-[3px]">
              <WalletMultiButton />
              </button>
            </div>

             <h1 className="text-center pt-[100px] font-bold md:text-3xl">KINDLY CONNECT YOUR WALLET</h1>
          </div>
        ) : (
          <div>
            Hello
          </div>
        )}
        </div>
      </div>
    </main>
  );
};

export default Home;