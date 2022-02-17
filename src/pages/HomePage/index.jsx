import { Button } from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const metamask = useSelector((state) => state.metamask);
  let navigate = useNavigate();

  const navigateMint = () => {
    navigate(`/mint`);
  };

  return (
    <div>
      <p>Home Page</p>
      <Button onClick={navigateMint}>Mint Now</Button>
    </div>
  );
};

export { HomePage };
