import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { fetchTalents } from '../features/talentsSlice';

const SkillFilter: React.FC = () => {
  const [skill, setSkill] = useState('');
  const dispatch = useAppDispatch();

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchTalents(skill));
  };

  const handleClear = () => {
    setSkill('');
    dispatch(fetchTalents());
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleFilter} className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Skill
          </label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Enter skill (e.g., React, Node.js)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Filter
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default SkillFilter;