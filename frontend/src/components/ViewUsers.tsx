import { useEffect, useRef, useState } from "react";
import { deleteUser, findUserById, findUserByUsername, getUserEvents, getUsers } from "../api";
import UserCard from "./UserCard";

const ViewUsers = () => {
  const [users, setUsers] = useState<any | null>(null);
  const [view, setView] = useState<string>("showAllUsers");
  const findUserByIdRef = useRef<any | null>(null);
  const findUserByUsernameRef = useRef<any | null>(null);

  const [user, setUser] = useState<any | null>(null);
  const [deleteSuccesseful, setDeleteSuccesseful] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const data = await getUsers();
      console.log("data", data);
      setUsers(data);
    })();
  }, []);

  const findByIdHandler = async (event: any) => {
    event.preventDefault();

    if (!findUserByIdRef.current) return null;
    const user = await findUserById(findUserByIdRef.current.value);
    setUser(user);
    setView("findUserByIdView");
  };

  const showAllUsersHandler = () => {
    setView("showAllUsers");
  };

  const findByUserNameHandler = async (event: any) => {
    event.preventDefault();

    if (!findUserByUsernameRef.current) return null;
    const user = await findUserByUsername(findUserByUsernameRef.current.value);
    setUser(user);
    setView("findUserByUsernameView");
  };

  useEffect(() => {
    (async () => {
      const data = await getUsers();
      console.log("data", data);
      setUsers(data);
    })();
  }, [deleteSuccesseful]);

  return (
    <div className="pt-4">
      <div className="flex flex-col gap-4 items-start">
        <button
          className="bg-blue-600 text-white p-1 w-40 rounded-sm"
          onClick={showAllUsersHandler}
        >
          Show all users
        </button>
        <form className="flex  gap-4" onSubmit={findByIdHandler}>
          <input
            type="text"
            className="p-2 rounded bg-blue-100 w-[200px]"
            placeholder="Find user by ID"
            ref={findUserByIdRef}
          />
          <button type="submit" className="bg-blue-600 text-white p-1 w-20 rounded-sm">
            Find
          </button>
        </form>
        <form className="flex  gap-4" onSubmit={findByUserNameHandler}>
          <input
            type="text"
            className="p-2 rounded bg-blue-100 w-[200px]"
            placeholder="Find user by username"
            ref={findUserByUsernameRef}
          />
          <button type="submit" className="bg-blue-600 text-white p-1 w-20 rounded-sm">
            Find
          </button>
        </form>
      </div>

      {view === "findUserByIdView" && (
        <div className="bg-blue-300 p-4 rounded-xl mt-4">
          <h3>ID:{user.id}</h3>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
          <div>Firstname: {user.firstName}</div>
          <div>Lastname: {user.lastName}</div>
          <div>Date of birth: {user.dateOfBirth}</div>
          <div>Password: {user.password}</div>
        </div>
      )}

      {view === "findUserByUsernameView" && (
        <div className="bg-blue-300 p-4 rounded-xl mt-4">
          <h3>ID:{user.id}</h3>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
          <div>Firstname: {user.firstName}</div>
          <div>Lastname: {user.lastName}</div>
          <div>Date of birth: {user.dateOfBirth}</div>
          <div>Password: {user.password}</div>
        </div>
      )}

      {view === "showAllUsers" && (
        <div className="pt-6 grid grid-flow-row grid-cols-2 gap-4">
          {users &&
            users.map((user: any, index: number) => (
              <UserCard user={user} key={index} setDeleteSuccesseful={setDeleteSuccesseful} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
