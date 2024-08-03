import { useCallback, useState } from "react";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
  createMintToInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createMintToCheckedInstruction,
  getAccount,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export const useMintToken = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [txSig, setTxSig] = useState("");
  const [tokenAccount, setTokenAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mintTo = useCallback(
    async (mintAddress: string, recipientAddress: string, amount: any) => {
      if (!connection || !publicKey) {
        throw new Error("Wallet not connected");
      }
      setError(null);

      try {
          const mintPubKey = new PublicKey(mintAddress);
      const recipientPubKey = new PublicKey(recipientAddress);

      const transaction = new Transaction();

      const associatedToken = await getAssociatedTokenAddress(
        mintPubKey,
        recipientPubKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );
      console.log("Associated Token Address:", associatedToken.toString());

      transaction.add(
        createMintToInstruction(mintPubKey, associatedToken, publicKey, amount, )
      );
      transaction.add(
        createMintToCheckedInstruction(
          mintPubKey,
          associatedToken,
          publicKey,
          amount * Math.pow(10, 8),
          8
        )
      );
      console.log("Transaction created:", transaction);


      const signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, "confirmed");

      setTxSig(signature);
      setTokenAccount(associatedToken.toString());

      const account = await getAccount(connection, associatedToken);
      setBalance(account.amount.toString());
          
      } catch (err) {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
      }

      
    },
    [connection, publicKey, sendTransaction]
  );

  return { mintTo, txSig, tokenAccount, balance, error };
};
