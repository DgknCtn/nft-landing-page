import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      {/* ... diğer menü öğeleri ... */}
      <Link to="/stake" className="nav-link">
        Stake
      </Link>
      {/* ... diğer menü öğeleri ... */}
    </nav>
  );
};

export default Navbar; 