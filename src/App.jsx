import TokenLaunchPad from "./components/TokenLaunchPad"
// wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center flex-col">
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <WalletMultiButton/>
              <TokenLaunchPad/>
            </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}
export default App;
