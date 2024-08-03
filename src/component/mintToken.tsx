// components/MintToForm.tsx
import { FC, useState } from "react";
import { useMintToken } from "@/hooks/UseMintToken";


export const MintToForm: FC = () => {
  const { mintTo, txSig, tokenAccount, balance, error } = useMintToken();
  const [formValues, setFormValues] = useState({
    mint: "",
    recipient: "",
    amount: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { mint, recipient, amount } = formValues;
    await mintTo(mint, recipient, amount);
  };

  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  return (
    <div>
      <br />
      <form onSubmit={handleSubmit} >
        <label htmlFor="mint">Token Mint:</label>
        <input
          id="mint"
          type="text"
          className=""
          value={formValues.mint}
          onChange={handleChange}
          placeholder="Enter Token Mint"
          required
        />
        <label htmlFor="recipient">Recipient:</label>
        <input
          id="recipient"
          type="text"
          className=""
          value={formValues.recipient}
          onChange={handleChange}
          placeholder="Enter Recipient PublicKey"
          required
        />
        <label htmlFor="amount">Amount Tokens to Mint:</label>
        <input
          id="amount"
          type="text"
          className=""
          value={formValues.amount}
          onChange={handleChange}
          placeholder="e.g. 100"
          required
        />
        <button type="submit" className="">
          Mint Tokens
        </button>
      </form>
      {error && <p >Error: {error}</p>}
      {txSig ? (
        <div>
          <p>Token Account: {tokenAccount} </p>
          <p>Token Balance: {balance} </p>
          <p>View your transaction on </p>
          <a href={link()}>Solana Explorer</a>
        </div>
      ) : null}
    </div>
  );
};
