import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  let navigate = useNavigate();

  const enterWebsite = () => {
    navigate(`/home`);
  };

  return (
    <div>
      <p>Landing Page</p>
      <Button content={"Enter"} handleClick={enterWebsite} />
    </div>
  );
};

export { LandingPage };
