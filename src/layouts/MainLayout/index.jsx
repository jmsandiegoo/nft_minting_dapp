import { Outlet } from "react-router-dom";
import { ErrorBanner } from "../../components/ErrorBanner";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useSelector } from "react-redux";

export const MainPageLayout = () => {
  const metamask = useSelector((state) => state.metamask);

  return (
    <div>
      {metamask.error && <ErrorBanner error={metamask.error} />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
