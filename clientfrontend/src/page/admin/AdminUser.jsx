"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function User() {
  const [users, setUserData] = useState([]);
  const { serverUrl } = useContext(AuthContext);

  const getAllUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/admin/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserData(result.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  if (!users || !localStorage.getItem("token")) {
    return (
      <div className="text-center mt-20 text-xl text-red-600">
        Please log in to view the user data.
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-xl p-4 sm:p-6">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-6 text-zinc-700">
        Admin User Data
      </h1>


      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Gender</th>
              <th className="p-3 border">Post</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="text-center hover:bg-orange-50">
                <td className="p-3 border">{u.username}</td>
                <td className="p-3 border break-all">{u.email}</td>
                <td className="p-3 border">{u.phone}</td>
                <td className="p-3 border">{u.department}</td>
                <td className="p-3 border capitalize">{u.gender}</td>
                <td className="p-3 border">{u.post}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {users.map((u, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 shadow-sm bg-orange-50"
          >
            <p><span className="font-semibold">Name:</span> {u.username}</p>
            <p className="break-all">
              <span className="font-semibold">Email:</span> {u.email}
            </p>
            <p><span className="font-semibold">Phone:</span> {u.phone}</p>
            <p><span className="font-semibold">Department:</span> {u.department}</p>
            <p className="capitalize">
              <span className="font-semibold">Gender:</span> {u.gender}
            </p>
            <p><span className="font-semibold">Post:</span> {u.post}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
