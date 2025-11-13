import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addTalent, clearError } from '../features/talentsSlice';
import type { TalentFormData } from '../types';

const TalentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.talents);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TalentFormData>();

  const onSubmit = async (data: TalentFormData) => {
    try {
      const talentData = {
        name: data.name.trim(),
        email: data.email.trim(),
        skills: data.skills.split(',').map(skill => skill.trim()).filter(Boolean),
        experience: Number(data.experience)
      };
      
      await dispatch(addTalent(talentData)).unwrap();
      toast.success('Talent added successfully!');
      reset();
    } catch (error: any) {
      toast.error(error || 'Failed to add talent');
    }
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Talent</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              {...register('name', { 
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills (comma separated)
          </label>
          <input
            type="text"
            {...register('skills')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="React, Node.js, MongoDB, TypeScript"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience (years) *
          </label>
          <input
            type="number"
            {...register('experience', { 
              required: 'Experience is required',
              min: { value: 0, message: 'Experience cannot be negative' },
              max: { value: 50, message: 'Experience seems too high' },
              valueAsNumber: true
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter years of experience"
          />
          {errors.experience && (
            <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Adding Talent...' : 'Add Talent'}
        </button>
      </form>
    </div>
  );
};

export default TalentForm;