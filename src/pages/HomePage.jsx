import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { AppNav } from "../components/AppNav";

export const HomePage = () => {
  return (
    <div>
      <Nav />
      <AppNav />
      <h1>World traveled</h1>
      <Link to="/app">Go to the App</Link>
    </div>
  );
};
