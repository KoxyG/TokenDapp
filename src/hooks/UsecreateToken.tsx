// hooks/useCreateTokenAccount.ts

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction } from "@solana/spl-token";

const useCreateTokenAccount = () => {
  const [txSig, setTxSig] = useState<string | null>(null);
  const [tokenAccount, setTokenAccount] = useState<string | null>(null);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const createTokenAccount = async (owner: string, mint: string) => {
    if (!connection || !publicKey) {
      return;
    }
    const transaction = new web3.Transaction();
    const ownerPublicKey = new web3.PublicKey(owner);
    const mintPublicKey = new web3.PublicKey(mint);

    const associatedToken = await getAssociatedTokenAddress(
      mintPublicKey,
      ownerPublicKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    transaction.add(
      createAssociatedTokenAccountInstruction(
        publicKey,
        associatedToken,
        ownerPublicKey,
        mintPublicKey,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );

    const signature = await sendTransaction(transaction, connection);
    setTxSig(signature);
    setTokenAccount(associatedToken.toString());
  };

  return {txSig, createTokenAccount, tokenAccount };
};

export default useCreateTokenAccount;
