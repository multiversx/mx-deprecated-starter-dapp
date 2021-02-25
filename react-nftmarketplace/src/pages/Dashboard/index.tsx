import { useContext } from 'context';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
  const { loggedIn } = useContext();

  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="dashboard w-100">
      <div className="card border-0">
        <div className="card-body pt-0 px-spacer pb-spacer">
          <span>Welcome to NFT Marketplace</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
