type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export default function UserTable({ users }: { users: User[] }) {
  return (
    <div className="max-w-5xl mx-auto  bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-orange-600/30 shadow-2xl rounded-lg shadow-orange-600/10 overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-zinc-700">
          <tr>
            <th className="p-4 border-b ">Name</th>
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">Phone</th>
            <th className="p-4 border-b">Update</th>
            <th className="p-4 border-b">Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center border-b">
              <td className="p-4">{u.name}</td>
              <td className="p-4">{u.email}</td>
              <td className="p-4">{u.phone}</td>

              <td className="p-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Edit
                </button>
              </td>

              <td className="p-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
