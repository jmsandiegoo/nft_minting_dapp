import { Button } from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONFIG } from "../../config/config";
import * as abi from "../../config/contractAbi.json";

const MintPage = () => {
  // const [mintAmount] = useState();
  const [contract] = useState();
  const metamask = useSelector((state) => state.metamask);

  const mint = async () => {
    if (!metamask.account && metamask.error) return;
    const { provider } = metamask;
    const smartContract = new ethers.Contract(
      CONFIG.CONTRACTS.MINT_CONTRACT.CONTRACT_ADDRESS,
      abi,
      provider.getSigner()
    );

    try {
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p>Mint Page</p>
      <></>
      <Button onClick={mint}>Mint</Button>
    </div>
  );
};

export { MintPage };
