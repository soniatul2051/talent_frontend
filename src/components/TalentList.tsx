import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchTalents } from '../features/talentsSlice';

const TalentList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.talents);

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Talent Directory</h2>
        <p className="text-gray-600 mt-1">
          {items.length} talent{items.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <div className="divide-y">
        {items.map((talent) => (
          <div key={talent._id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {talent.name}
                </h3>
                <p className="text-gray-600 mt-1">{talent.email}</p>
                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Experience:</span> {talent.experience} year{talent.experience !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {new Date(talent.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            {talent.skills.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {talent.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <p className="text-gray-500 text-lg">No talents found</p>
            <p className="text-gray-400 mt-2">Add some talents to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentList;