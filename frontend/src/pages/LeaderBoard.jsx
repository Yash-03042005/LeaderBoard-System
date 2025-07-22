// src/pages/LeaderBoard.jsx
import Header from '../components/Header';
import UserDropdown from '../components/UserDropDown.jsx';
import LeaderboardTable from '../components/LeaderboardTable';

const LeaderBoard = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <UserDropdown/>
      <LeaderboardTable />
    </div>
  );
};

export default LeaderBoard;
