import React, { useState } from 'react';
import { User, BookOpen, Briefcase, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SkillsInput from './SkillsInput';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  current: boolean;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
}

const ProfileForm: React.FC = () => {
  const { currentUser, updateProfile, addSkill, removeSkill } = useAuth();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillsChange = (skills: string[]) => {
    // In a real app, we would update the entire skills array in one operation
    // For this demo, we'll use our separate add/remove skill functions
    const currentSkills = currentUser?.skills || [];
    
    // Find skills to remove
    currentSkills.forEach(skill => {
      if (!skills.includes(skill)) {
        removeSkill(skill);
      }
    });
    
    // Find skills to add
    skills.forEach(skill => {
      if (!currentSkills.includes(skill)) {
        addSkill(skill);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      updateProfile({
        name: formData.name,
        bio: formData.bio,
      });
      
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 flex items-center border-b border-gray-200">
          <User className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        </div>
        <div className="px-6 py-5 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Professional Summary
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Tell us about yourself, your career goals, and what you're looking for..."
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 flex items-center border-b border-gray-200">
          <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Skills</h3>
        </div>
        <div className="px-6 py-5">
          <div className="space-y-1">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Your Skills
            </label>
            <p className="text-sm text-gray-500">
              Add skills that showcase your expertise. These will be used to match you with relevant jobs.
            </p>
          </div>
          <div className="mt-2">
            <SkillsInput 
              skills={currentUser.skills || []} 
              onChange={handleSkillsChange} 
            />
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 flex items-center border-b border-gray-200">
          <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Experience</h3>
        </div>
        <div className="px-6 py-5">
          <ExperienceForm />
        </div>
      </div>

      {/* Education */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 flex items-center border-b border-gray-200">
          <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Education</h3>
        </div>
        <div className="px-6 py-5">
          <EducationForm />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        {successMessage && (
          <div className="mr-auto bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm flex items-center">
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
            {successMessage}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="mr-2 -ml-1 h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;