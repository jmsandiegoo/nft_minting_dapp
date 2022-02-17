import { CONFIG } from "../../config/config";
import * as abi from "../../config/contractAbi.json";
import { ethers } from "ethers";

// Actions
const connectRequest = () => {
  return {
    type: "METAMASK_CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "METAMASK_CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "METAMASK_CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "METAMASK_UPDATE_ACCOUNT",
    payload: payload,
  };
};

const disconnectRequest = () => {
  return {
    type: "METAMASK_DISCONNECT",
  };
};

// Thunks
const metamaskConnect = (isUserInvoked = false) => {
  return async (dispatch, getState) => {
    dispatch(connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      try {
        let accounts = await provider.listAccounts();

        // When connect button is pressed
        if (accounts.length <= 0 && isUserInvoked) {
          console.log("Use invoked connection");
          await provider.send("eth_requestAccounts");
          accounts = await provider.listAccounts();
        }

        if (accounts.length > 0) {
          const networkId = (await provider.getNetwork()).chainId;
          if (parseInt(networkId) === CONFIG.NETWORK.ID) {
            dispatch(
              connectSuccess({
                account: accounts[0],
                provider: provider,
              })
            );
          } else {
            dispatch(
              connectFailed({
                account: accounts[0],
                provider: provider,
                error: {
                  errorType: "Wrong Network",
                  errorMessage: `Please change network to ${CONFIG.NETWORK.NAME}`,
                },
              })
            );
          }
        }
      } catch (e) {
        console.log(e);
        dispatch(
          connectFailed({
            error: {
              errorType: "Network Error",
              errorMessage:
                "There was an error that occured while communicating with the network. Please try again ",
            },
          })
        );
      }
    } else {
      dispatch(
        connectFailed({
          error: {
            errorType: "Metamask not detected",
            errorMessage: "Please install metamask extension",
          },
        })
      );
    }
  };
};

const metamaskDisconnect = () => {
  return (dispatch) => {
    dispatch(disconnectRequest());
  };
};

const metamaskUpdateAccount = (account) => {
  return (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
  };
};

export { metamaskConnect, metamaskDisconnect, metamaskUpdateAccount };
