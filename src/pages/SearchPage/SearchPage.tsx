import { Link } from "react-router-dom";

const SearchPage = () => {

  return(
    <>
      <div>SearchPage</div>
            
      <h1>
        Home page
      </h1>
      <span>Done pages:</span>
      <br />
      <Link to='/faq' className="underline">FAQ page</Link>
      <br />
      <Link to="/privacy" className="underline">Privacy page</Link>
      <br />
      <Link to="/termsofuse" className="underline">Terms of Use</Link>
      <br />
      <Link to="https://nclone.instatus.com/" className="underline">System Status Page</Link>
      <br />
      <br />
      <span>In process:</span>
      
      <br />
      <br />
    </>
  )
};

export default SearchPage;
