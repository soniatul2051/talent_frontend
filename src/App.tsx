import React from 'react';
import { Toaster } from 'react-hot-toast';
import TalentForm from './components/TalentForm';
import TalentList from './components/TalentList';
import SkillFilter from './components/SkillFilter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Talent Directory
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and filter talents by their skills
          </p>
        </header>
        
        <div className="space-y-6">
          <TalentForm />
          <SkillFilter />
          <TalentList />
        </div>
      </div>
    </div>
  );
};

export default App;