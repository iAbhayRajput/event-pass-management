import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to QR Pass System</h1>
      <p>Generate and validate event QR passes seamlessly.</p>
      <Link to="/register">
        <button>Get a Pass</button>
      </Link>
    </div>
  );
};

export default Home;
