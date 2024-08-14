import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { FileProvider } from "./FileContext";

function App() {
  return (
    <>
     <FileProvider>
      <div className="h-screen w-full bg-[#191D17]">
        <Navbar />
        <div className="flex">
          <Home />
        </div>
      </div>
      </FileProvider>
    </>
  );
}

export default App;
