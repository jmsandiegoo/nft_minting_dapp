import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  metamaskConnect,
  metamaskDisconnect,
  metamaskUpdateAccount,
} from "../../store/metamask/metamaskAction";
import { Button } from "../Button";

const Navbar = () => {
  const metamask = useSelector((state) => state.metamask);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(metamaskConnect(false));

    if (window.ethereum && window.ethereum.isMetaMask) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          dispatch(metamaskUpdateAccount(accounts[0]));
        } else {
          dispatch(metamaskDisconnect());
        }
      };

      const handleChainChanged = () => {
        dispatch(metamaskConnect(false));
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  return (
    <div>
      <p>Howling Hustlers</p>
      {metamask.account ? (
        <Button>{metamask.account}</Button>
      ) : (
        <Button
          handleClick={() => {
            dispatch(metamaskConnect(true));
          }}
        >
          Connect
        </Button>
      )}
    </div>
  );
};

export { Navbar };
