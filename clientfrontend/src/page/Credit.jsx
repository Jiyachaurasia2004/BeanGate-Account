import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Credit() {
  const { serverUrl } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    voucherNo: "",
    transactionType: "credit", 
    description: "",
    amount: "",
    paidBy: "",
    name: "",
    paymentMode: "",
    category: "",
    reimbursementStatus: "pending", 
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${serverUrl}/api/form/credit`, formData);
      toast.success("Transaction saved successfully!");
      setFormData({
        date: "",
        voucherNo: "",
        transactionType: "credit",
        description: "",
        amount: "",
        paidBy: "",
        name: "",
        paymentMode: "",
        category: "",
        reimbursementStatus: "pending",
        remarks: "",
      });
    } catch (error) {
      toast.error("Error submitting transaction");
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-7 flex flex-col justify-center container mx-auto px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>


      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60"></div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
    
    
      <h1 className="text-4xl md:text-5xl font-bold text-zinc-700 text-center mb-8">
        Beangate <span className="text-orange-600">Account</span>
      </h1>

      <div className="flex justify-center items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="p-5 mb-8 w-full max-w-md bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-orange-600/30 shadow-2xl rounded-lg shadow-orange-600/10"
        >
          <h1 className="text-3xl text-center font-bold mb-4">
            Credit From
          </h1>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
            required
          />
          <input
            type="text"
            name="voucherNo"
            placeholder="Voucher No"
            value={formData.voucherNo}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
            required
          />
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
          >
            <option value="credit">Credit</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
            required
          />
          <select
            name="paidBy"
            value={formData.paidBy}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
          >
            <option value="">Paid By (Optional)</option>
            <option value="company">Company</option>
            <option value="client">Client</option>
            <option value="self">Self</option>
          </select>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
            required
          >
            <option value="">Payment Mode</option>
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="bank">Bank Transfer</option>
            <option value="card">Card</option>
          </select>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
            required
          >
            <option value="">Category</option>
            <option value="sales">Sales</option>
            <option value="rent">Rent</option>
            <option value="salary">Salary</option>
            <option value="electricity">Electricity</option>
            <option value="other">Other</option>
          </select>
          <select
            name="reimbursementStatus"
            value={formData.reimbursementStatus}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
          >
            <option value="pending">No Application</option>
            <option value="approved">Pending</option>
            <option value="rejected">Reimbursed</option>
          </select>

          <textarea
            name="remarks"
            placeholder="Remarks (Optional)"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full mb-4 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-lg shadow-lg shadow-orange-600/50 hover:shadow-xl hover:shadow-orange-600/70 transition-all gap-2 border-2 border-orange-500/20 cursor-pointer mt-4"
          >
            {isLoading ? "Saving..." : "Save Transaction"}
          </button>
          <div className="pt-[20px]">
            {" "}
            <Link
              to="/debit"
              className="w-full block text-center py-3 border-2 border-orange-600/50 text-orange-500 rounded-md hover:bg-orange-600/10 hover:border-orange-600 transition-all font-medium"
            >
              {" "}
              Debit Here{" "}
            </Link>{" "}
          </div>{" "}
          <div className="text-center mt-6 space-y-2 text-gray-500 text-xs">
            {" "}
            <p>© 2024 Beangate IT Solutions. All rights reserved.</p>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Credit;
