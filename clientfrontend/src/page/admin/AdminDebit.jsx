"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Debit() {
  const { serverUrl } = useContext(AuthContext);

  const [debits, setDebits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serverUrl) return;

    const getAllDebit = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/admin/debit`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // 🔥 backend response: { debits: [] }
        setDebits(result.data?.debits || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAllDebit();
  }, [serverUrl]);

  if (!localStorage.getItem("token")) {
    return (
      <div className="text-center mt-20 text-xl text-red-600">
        Please log in to view the Debit data.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl text-zinc-600">
        Loading Debit Data...
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-4 sm:p-6">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-6 text-zinc-700">
        Admin Debit Data
      </h1>

      {/* 🖥️ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">From</th>
            </tr>
          </thead>
          <tbody>
            {debits.map((d) => (
              <tr key={d._id} className="text-center hover:bg-orange-50">
                <td className="p-3 border">{d.name}</td>
                <td className="p-3 border break-all">{d.email}</td>
                <td className="p-3 border">{d.contact}</td>
                <td className="p-3 border font-semibold text-green-600">
                  ₹{d.amount}
                </td>
                <td className="p-3 border">{d.from}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Cards (ADDED) */}
      <div className="md:hidden space-y-4">
        {debits.map((d) => (
          <div
            key={d._id}
            className="border rounded-lg p-4 shadow-sm bg-orange-50"
          >
            <p>
              <span className="font-semibold">Name:</span> {d.name}
            </p>
            <p className="break-all">
              <span className="font-semibold">Email:</span> {d.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {d.contact}
            </p>
            <p className="font-semibold text-green-700">
              <span className="text-black font-semibold">Amount:</span> ₹{d.amount}
            </p>
            <p>
              <span className="font-semibold">From:</span> {d.from}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Debit;
