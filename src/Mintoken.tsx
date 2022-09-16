import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Keypair,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer,
    Account,
    getMint,
    getAccount
} from '@solana/spl-token';
import { time } from 'console';


console.log("Reachiving");


function  MintToken() {

  const connection = new Connection(clusterApiUrl('testnet'),'confirmed');
  const fromWallet = Keypair.generate();
  let createAssoicatedAccount: Account;
  let mint:PublicKey;
  
  async function createToken()  {
    console.log("Entered creating token account");
    const airdrop = await connection.requestAirdrop(fromWallet.publicKey,LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdrop);

    const mint = await createMint(connection,fromWallet,fromWallet.publicKey,null,1);
    console.log(mint);
    console.log('Mint token created: ',mint.toBase58());

    const createAssoicatedAccount = await getOrCreateAssociatedTokenAccount(connection,fromWallet,mint,fromWallet.publicKey);
    console.log(createAssoicatedAccount);

    console.log("The account address is ",createAssoicatedAccount.address.toBase58());

  }
  

  async function mintToken(){
    console.log("entered mint token");
    const signature = await mintTo(connection,fromWallet,mint,createAssoicatedAccount.address,fromWallet.publicKey,1,undefined);
    console.log("TOKEN HAS BEEN MINTED TO " ,signature);
  }

  async function checkBalance ()  {
    const mintInfo = await getMint(connection,mint);
    console.log(mintInfo);
  }
    return (
        <div>
            Mint Token
            <div></div>
            <button onClick={createToken}>Create Token</button>
            <button onClick={mintToken}>Mint Token</button>
            <button onClick={checkBalance}>Check Balance</button>
            <button>Send Token</button>
        </div>
      );
}

export default MintToken;