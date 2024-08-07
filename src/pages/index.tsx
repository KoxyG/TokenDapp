import * as React from "react";
import { toast } from "react-toastify";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import Image from "next/image";
import { CreateTokenAccountForm } from "../component/createTokenAccount"
import Link from "next/link";

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
              <button className="!bg-gradient-to-r from-[#35d6ab] to-[#cd32fc] rounded-md sm:px-[3px] sm:py-[3px]">
              <WalletMultiButton />
              </button>
            </div>

             <h1 className="text-center pt-[100px] font-bold md:text-3xl">KINDLY CONNECT YOUR WALLET</h1>
          </div>
        ) : (
          <div>
            <div className="grid place-content-end pt-6 pr-6">
              <button className="!bg-gradient-to-r from-[#35d6ab] to-[#cd32fc] rounded-md sm:px-[3px] sm:py-[3px]">
              <WalletMultiButton />
              </button>
            </div>
            <div className="grid space-y-4 px-[200px] py-[100px]">
            <Link className="text-bold   sm:text-[20px]" href="/createTokens"> 
            <button className="px-3 py-4 bg-[#7727e8] rounded-md">
              Create Token
            </button>
            </Link>

            <Link className="text-bold sm:text-[20px]" href="/mintTokens">
            <button className="px-3 py-4 bg-[#7727e8] rounded-md">
            Mint Token
            </button>
             </Link>
            <Link className="text-bold sm:text-[20px]" href="/transferTokens">
            <button className="px-3 py-4 bg-[#7727e8] rounded-md">
            Transfer Token
            </button>
            </Link>
            <Link className="text-bold sm:text-[20px]" href="/burn">
            <button className="px-3 py-4 bg-[#7727e8] rounded-md">
            Burn Token
            </button>
            </Link>
            <Link className="text-bold sm:text-[20px]" href="/delegate">
            <button className="px-3 py-4 bg-[#7727e8] rounded-md">
            Delegate Token
            </button>
            </Link>
            </div>

            

            {/* <h1 className="text-center pt-[50px] font-bold md:text-2xl">Create a token</h1>
            <CreateTokenAccountForm /> */}
          
          </div>
          
        )}
        </div>
      </div>
    </main>
  );
};

export default Home;