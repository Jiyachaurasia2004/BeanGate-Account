import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Credit() {
  const [credits, setCreditData] = useState([]);
  const { serverUrl } = useContext(AuthContext);

  const getAllCredit = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/admin/credit`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCreditData(result.data.credits);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCredit();
  }, []);

  if (!localStorage.getItem("token")) {
    return (
      <div className="text-center mt-20 text-xl text-red-600">
        Please log in to view the credit data.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-zinc-700">
        Admin Credit Data
      </h2>

      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-zinc-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone No.</th>
              <th className="p-3">Date</th>
              <th className="p-3">Voucher</th>
              <th className="p-3">Type</th>
              <th className="p-3">Description</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Paid By</th>

              <th className="p-3">Mode</th>
              <th className="p-3">Category</th>
              <th className="p-3">Remarks</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {credits.map((item, index) => (
              <tr key={index} className="text-center border-t hover:bg-gray-50">
                <td className="p-3">{item.name || "-"}</td>
                <td className="p-3">{item.email || "-"}</td>
                <td className="p-3">{item.phone || "-"}</td>
                <td className="p-3">
                  {new Date(item.date).toLocaleDateString("en-GB")}
                </td>

                <td className="p-3">{item.voucherNo || "-"}</td>
                <td className="p-3 capitalize">{item.transactionType}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3 font-semibold">₹{item.amount}</td>
                <td className="p-3">{item.paidBy || "-"}</td>

                <td className="p-3 uppercase">{item.paymentMode}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.remarks || "-"}</td>
                <td
                  className={`p-3 font-semibold ${
                    item.reimbursementStatus === "approved"
                      ? "text-green-600"
                      : item.reimbursementStatus === "rejected"
                      ? "text-red-600"
                      : "text-orange-600"
                  }`}
                >
                  {item.reimbursementStatus || "pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {credits.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-4 space-y-1">
            <p>
              <span className="font-semibold">Name:</span> {item.name || "-"}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {item.email || "-"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {item.phone || "-"}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(item.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Voucher:</span>{" "}
              {item.voucherNo || "-"}
            </p>
            <p>
              <span className="font-semibold">Type:</span>{" "}
              {item.transactionType}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {item.description}
            </p>
            <div className="flex gap-2">
              <span className="font-semibold">Amount:</span>
              <p className="font-bold text-lg"> ₹{item.amount}</p>
            </div>

            <p>
              <span className="font-semibold">Paid By:</span>{" "}
              {item.paidBy || "-"}
            </p>

            <p>
              <span className="font-semibold">Mode:</span> {item.paymentMode}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {item.category}
            </p>
            <p>
              <span className="font-semibold">Remarks:</span> {item.remarks}
            </p>
            <p
              className={`font-semibold ${
                item.reimbursementStatus === "approved"
                  ? "text-green-600"
                  : item.reimbursementStatus === "rejected"
                  ? "text-red-600"
                  : "text-orange-600"
              }`}
            >
              Status: {item.reimbursementStatus || "pending"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Credit;
