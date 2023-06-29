import React, { useEffect, useState } from "react";
import { deleteUser, getUserEvents } from "../api";

const UserCard = ({ user, setDeleteSuccesseful }) => {
  const [userData, setUserData] = useState<any | null>(null);
  useEffect(() => {
    (async () => {
      const response = await getUserEvents(user.id);
      setUserData(response);
    })();
  }, []);

  const deleteUserHandler = async (event: any, userId: number) => {
    event.preventDefault();
    await deleteUser(userId);
    setDeleteSuccesseful((prev: any) => prev + 1);
  };

  return (
    <form
      className="bg-blue-300 p-4 rounded-xl"
      onSubmit={(event) => deleteUserHandler(event, user.id)}
    >
      <h3>ID:{user.id}</h3>
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
      <div>Firstname: {user.firstName}</div>
      <div>Lastname: {user.lastName}</div>
      <div>Date of birth: {user.dateOfBirth}</div>
      <div>Password: {user.password}</div>
      <div>
        User's event subscriptions:
        <ul>
          {userData &&
            userData.map((item: any, index: number) => (
              <li className="bg-slate-200 m-2 p-2 rounded-sm" key={index}>
                <div>Title: {item.title}</div>
                <div>ID: {item.id}</div>
              </li>
            ))}
        </ul>
      </div>
      <button type="submit" className="bg-red-800 text-white p-2 rounded-xl h-10 mt-4">
        Delete
      </button>
    </form>
  );
};

export default UserCard;
