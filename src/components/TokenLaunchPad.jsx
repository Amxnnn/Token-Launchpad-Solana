import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

const  TokenLaunchPad = () => {
    const wallet =useWallet();
    const { connection } = useConnection();
    async function createToken(){
      const name = document.getElementById("name")
      const symbol = document.getElementById("symbol")
      const imageUrl = document.getElementById("imageUrl")
      const initialSupply = document.getElementById("initialSupply");
      // createMint()
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const keypair =  Keypair.generate(); //random keypair generate
      const transaction = new Transaction().add(    //creates new account on blockchain
        SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,    //Account paying for creating the new mint account
            newAccountPubkey: keypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId : TOKEN_PROGRAM_ID
        }),
        createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),  //(keypair.publicKey, decimals, mintAuthority, freezeAuthority, programId)  //data add karega
    );

    const recentBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = recentBlockhash.blockhash;  //
    transaction.feePayer = wallet.publicKey  //kon pay karega


    transaction.partialSign(keypair);  //partial sign cause we dont have user private key 
    let response = await  wallet.sendTransaction(transaction , connection); //ask user to sign transcation
    console.log(response);
  } 

  return (
    <div className=" bg-black text-white flex justify-center text-3xl items-center gap-8 flex-col" >
        <h1 className="text-5xl font-semibold" >Token Launchpad</h1>
        <input id="name" type="text" className="w-[20rem] mt-8 inputText  bg-slate-600 border-solid  border-b-[1px]  border-white  " placeholder="Name" ></input>
        <input id="symbol" type="text" className="w-[20rem] inputText  bg-slate-600 border-solid  border-b-[1px]  border-white  " placeholder="Symbol" ></input>
        <input id="imageUrl" type="text" className="w-[20rem] inputText bg-slate-600 border-solid  border-b-[1px]  border-white  " placeholder="Image URL" ></input>
        <input  id="initialSupply" type="text" className="w-[20rem] inputText  bg-slate-600 border-solid  border-b-[1px]  border-white  " placeholder="Initial Supply" ></input>
        <button className="btn text-xl rounded-md bg-slate-800 p-3 "  onClick={createToken} > Create a Token </button>
    </div>
  )
}

export default TokenLaunchPad
