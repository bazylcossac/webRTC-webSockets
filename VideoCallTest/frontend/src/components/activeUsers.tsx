import { useSelector } from "react-redux";

function ActiveUsers() {
  const activeUsers = useSelector((state) => state.user.activeUsers);
  return (
    <div>
      {" "}
      {activeUsers?.map((user, i) => (
        <div
          className=" p-2 bg-black inline-block text-white hover:cursor-pointer"
          key={i}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}

export default ActiveUsers;
