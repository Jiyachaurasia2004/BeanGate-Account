"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreditPage() {
 const [credits , setCreditData] = useState([]);
  const getAllDebit = async()=>{
    try {
        const result = await axios.get("http://localhost:3000/api/admin/credit",{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
     
    )
    const data =  result.data;
   
    console.log(data);
     setCreditData(data.credits);
    } catch (error) {
      console.log(error)
    }
  
  }
  useEffect(()=>{
    getAllDebit();
  },[])

  return    <div className="max-w-5xl mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-orange-600/30 shadow-2xl rounded-lg shadow-orange-600/10 overflow-hidden">
   <header className="p-6 text-center  text-3xl font-bold border-b text-zinc-700">
      Admin Credit Data
    </header>
 
  <div className="overflow-x-auto">
    <table className="w-full border-collapse min-w-[600px] md:min-w-full">
      <thead className="bg-gray-100 text-zinc-700">
        <tr>
          <th className="p-4 border-b">Name</th>
          <th className="p-4 border-b">Email</th>
          <th className="p-4 border-b">Phone</th>
          <th className="p-4 border-b">Amount</th>
          <th className="p-4 border-b">From</th>
         
        </tr>
      </thead>

      <tbody>
        {Array.isArray(credits) && credits.map((curruser, index) => (
          <tr key={index} className="text-center border-b">
            <td className="p-4">{curruser.name}</td>
            <td className="p-4">{curruser.email}</td>
            <td className="p-4">{curruser.contact}</td>
            <td className="p-4">{curruser.amount}</td>
            <td className="p-4">{curruser.from}</td>
           
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


}