import { useSelector } from "react-redux";
function Dashboard() {
  const activeUsers = useSelector((state) => state.user.activeUsers);

  return (
    <div>
      {activeUsers?.map((user, i) => (
        <p className="text-black" key={i}>
          {user.username}
        </p>
      ))}
    </div>
  );
}

export default Dashboard;
