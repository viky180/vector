import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="app-bg grid min-h-screen place-items-center px-4">
      <div className="panel max-w-md p-8 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-4xl font-semibold text-[#071647]">Page not found</h1>
        <p className="mt-2 text-stone-600">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-accent mt-5">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
