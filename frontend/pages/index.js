import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [address, setAddress] = useState('');
  const [stats, setStats] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(\`http://localhost:8000/stats/\${address}\`);
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Tea Testnet Tracker</h1>
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Wallet Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded w-80"
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Check
        </button>
      </form>

      {stats && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <p><strong>Address:</strong> {stats.address}</p>
          <p><strong>Total Transactions:</strong> {stats.total_transactions}</p>
          <p><strong>Swaps:</strong> {stats.swap_count}</p>
          <p><strong>Bridges:</strong> {stats.bridge_count}</p>
          <p><strong>Stakes:</strong> {stats.stake_count}</p>
          <p><strong>Deploys:</strong> {stats.deploy_count}</p>
          <p><strong>Mints:</strong> {stats.mint_count}</p>
        </div>
      )}
    </div>
  );
}
