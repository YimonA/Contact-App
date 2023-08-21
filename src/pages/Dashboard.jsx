import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Routeguard from "../components/Routeguard";
import PropTypes from "prop-types";

const Dashboard = ({ view }) => {
  Dashboard.propTypes = {
    view: PropTypes.any,
  };
  return (
    <Routeguard>
      <div className=" container-fluid min-h-screen">
        <Navbar />
        <div className="h-full flex justify-start items-start">
          <Sidebar />
          {view}
        </div>
      </div>
    </Routeguard>
  );
};

export default Dashboard;
