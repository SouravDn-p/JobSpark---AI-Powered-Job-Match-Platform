import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Briefcase, Calendar, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  current: boolean;
}

const ExperienceForm: React.FC = () => {
  const { currentUser, addExperience, updateExperience, removeExperience } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    });
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const experienceData = {
      title: formData.title,
      company: formData.company,
      startDate: formData.startDate,
      endDate: formData.current ? null : formData.endDate,
      description: formData.description,
      current: formData.current,
    };
    
    if (editingId) {
      updateExperience({ ...experienceData, id: editingId });
    } else {
      addExperience(experienceData);
    }
    
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (experience: Experience) => {
    setFormData({
      title: experience.title,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate || '',
      description: experience.description,
      current: experience.current,
    });
    setEditingId(experience.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  // Format date for better display (YYYY-MM to Month Year)
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const experienceItems = currentUser?.experience || [];

  return (
    <div>
      {experienceItems.length > 0 ? (
        <div className="space-y-5 mb-6">
          {experienceItems.map((experience) => (
            <div key={experience.id} className="flex border-b border-gray-200 pb-5 last:border-b-0 last:pb-0">
              <div className="mr-4 flex-shrink-0 self-start pt-1">
                <div className="bg-gray-100 p-2 rounded-md">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-medium text-gray-900">{experience.title}</h4>
                    <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                      <div className="flex items-center mr-4">
                        <Building className="mr-1 h-4 w-4 text-gray-400" />
                        {experience.company}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(experience)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeExperience(experience.id)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded-md hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
                {experience.description && (
                  <p className="mt-2 text-sm text-gray-600">{experience.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
          <p>No experience added yet</p>
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 border border-gray-200 rounded-md p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                name="company"
                id="company"
                required
                value={formData.company}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="month"
                name="startDate"
                id="startDate"
                required
                value={formData.startDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="month"
                name="endDate"
                id="endDate"
                disabled={formData.current}
                value={formData.endDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <input
                id="current"
                name="current"
                type="checkbox"
                checked={formData.current}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                I currently work here
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {editingId ? 'Update Experience' : 'Add Experience'}
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-4 flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceForm;