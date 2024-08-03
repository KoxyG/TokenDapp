// components/CreateTokenAccountForm.tsx
import { FC } from "react";
import useCreateTokenAccount from "@/hooks/UsecreateToken";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, MINT_SIZE, getMinimumBalanceForRentExemptMint, createInitializeMintInstruction } from "@solana/spl-token";
import { MintToForm } from "./mintToken";

export const CreateTokenAccountForm: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { txSig, createTokenAccount, tokenAccount } = useCreateTokenAccount();
  

  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : "";
  };

  const createMint = async (event: any): Promise<string> => {
     event.preventDefault();
     if (!connection || !publicKey) {
       return "";
     }
 
     const mint = web3.Keypair.generate();
 
     const lamports = await getMinimumBalanceForRentExemptMint(connection);
 
     const transaction = new web3.Transaction();
 
     transaction.add(
       web3.SystemProgram.createAccount({
         fromPubkey: publicKey,
         newAccountPubkey: mint.publicKey,
         space: MINT_SIZE,
         lamports,
         programId: TOKEN_PROGRAM_ID,
       }),
       createInitializeMintInstruction(
         mint.publicKey,
         0,
         publicKey,
         publicKey,
         TOKEN_PROGRAM_ID
       )
     );
 
     await sendTransaction(transaction, connection, {
       signers: [mint],
     });
       return mint.publicKey.toString()
   };
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!connection || !publicKey) {
     return;
   }


   try {
    const owner = (event.currentTarget.elements.namedItem("owner") as HTMLInputElement).value;
    const mint = await createMint(event)
    console.log("Token-Mint", mint)
    console.log("Mint public key", mint)
    createTokenAccount(owner, mint);

    
   } catch (error) {
    console.log("error ", error)
   }
  

  };

  return (
    <div>
      <br />
      {publicKey ? (
        <form onSubmit={handleSubmit} className="grid">
          <label htmlFor="owner">Token Account Owner:</label>
          <input
            id="owner"
            type="text"
            className=""
            placeholder="Enter Token Account Owner PublicKey"
            required
          />
          <button  type="submit" className="">
            Create Token Account
          </button>
        </form>
      ) : (
        <span></span>
      )}
      {txSig ? (
        <div>
          <p>Token Account Address: {tokenAccount}</p>
          <p>View your transaction on </p>
          <a href={link()}>Solana Explorer</a>

          <br />
          <MintToForm />
        </div>
      ) : null}
    </div>
  );
};
