import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Gastronomy POS System</h1>
      <nav>
        <Link to="/orders">Manage Orders</Link>
      </nav>
    </div>
  );
};

export default Home;
