"use client"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

 function User() {
 const [users , setUserData] = useState([]);
     const {serverUrl}  =useContext(AuthContext)
  const getAllUser = async()=>{
    try {
        const result = await axios.get(`${serverUrl}/api/admin/user`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
     
    )
    const data =  result.data;
   
    console.log(data);
     setUserData(data.users);
    } catch (error) {
      console.log(error)
    }
  
  }
  useEffect(()=>{
    getAllUser();
  },[])



  return  (
    <div className="max-w-5xl  mx-auto  bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-orange-600/30 shadow-2xl rounded-lg shadow-orange-600/10 overflow-hidden">
        <header className="p-6 text-center  text-3xl font-bold border-b text-zinc-700">
      Admin User Data
    </header>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-zinc-700">
          <tr>
            <th className="p-4 border-b ">Name</th>
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">Phone</th>
          
          </tr>
        </thead>

        <tbody>
          {Array.isArray(users) && users.map((curruser, index) => (
            <tr key={index} className="text-center border-b">
              <td className="p-4">{curruser.username}</td>
              <td className="p-4">{curruser.email}</td>
              <td className="p-4">{curruser.phone}</td>

             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default User;