import { Link } from "react-router-dom";

const HomePage = () => {

  return(
    <div>
      <h1>
        Home page
      </h1>
      <div>
        <span>Done pages:</span>
        <br />
        <Link to='/faq' className="underline">FAQ page</Link>
        <br />
        <Link to="/privacy" className="underline">Privacy page</Link>
        <br />
        <Link to="/termsofuse" className="underline">Terms of Use</Link>
        <br />
        <br />
        <span>In process:</span>
      </div>
    </div>
  )
};

export default HomePage;
