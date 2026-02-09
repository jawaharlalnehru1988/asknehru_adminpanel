import React, { useState, useEffect } from 'react';
import { getYogaPoses, deleteYogaPose, searchYogaPoses, getYogaPosesByDifficulty } from '../services/api';

const YogaPosesList = ({ onEdit }) => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  const fetchPoses = async () => {
    try {
      setLoading(true);
      const data = await getYogaPoses();
      setPoses(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch yoga poses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoses();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) {
      fetchPoses();
      return;
    }
    try {
      setLoading(true);
      const data = await searchYogaPoses(searchTerm);
      setPoses(data);
      setError(null);
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDifficultyFilter = async (difficulty) => {
    setDifficultyFilter(difficulty);
    if (!difficulty) {
      fetchPoses();
      return;
    }
    try {
      setLoading(true);
      const data = await getYogaPosesByDifficulty(difficulty);
      setPoses(data);
      setError(null);
    } catch (err) {
      setError('Filter failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, poseName) => {
    if (window.confirm(`Are you sure you want to delete "${poseName}"?`)) {
      try {
        await deleteYogaPose(id);
        fetchPoses();
      } catch (err) {
        alert('Failed to delete yoga pose');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Yoga Poses</h2>
      
      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search poses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
        <select
          value={difficultyFilter}
          onChange={(e) => handleDifficultyFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Difficulties</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
        <button
          onClick={fetchPoses}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      {/* Poses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poses.map((pose) => (
          <div key={pose.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {pose.imageUrl && (
              <img
                src={pose.imageUrl}
                alt={pose.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{pose.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  pose.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-800' :
                  pose.difficulty === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {pose.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{pose.sanskritName}</p>
              <p className="text-sm text-gray-500 mb-2">{pose.quickBenefit}</p>
              <div className="flex gap-2 mb-3 flex-wrap">
                {pose.tags && pose.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(pose)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pose.id, pose.name)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {poses.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No yoga poses found. Click "Add New Pose" to create one.
        </div>
      )}
    </div>
  );
};

export default YogaPosesList;
