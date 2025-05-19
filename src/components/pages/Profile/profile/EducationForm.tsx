import React, { useState } from 'react';
import { Plus, Pencil, Trash2, BookOpen, Calendar, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
}

const EducationForm: React.FC = () => {
  const { currentUser, addEducation, updateEducation, removeEducation } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    current: false,
  });

  const resetForm = () => {
    setFormData({
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
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
    
    const educationData = {
      degree: formData.degree,
      institution: formData.institution,
      startDate: formData.startDate,
      endDate: formData.current ? null : formData.endDate,
      current: formData.current,
    };
    
    if (editingId) {
      updateEducation({ ...educationData, id: editingId });
    } else {
      addEducation(educationData);
    }
    
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (education: Education) => {
    setFormData({
      degree: education.degree,
      institution: education.institution,
      startDate: education.startDate,
      endDate: education.endDate || '',
      current: education.current,
    });
    setEditingId(education.id);
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

  const educationItems = currentUser?.education || [];

  return (
    <div>
      {educationItems.length > 0 ? (
        <div className="space-y-5 mb-6">
          {educationItems.map((education) => (
            <div key={education.id} className="flex border-b border-gray-200 pb-5 last:border-b-0 last:pb-0">
              <div className="mr-4 flex-shrink-0 self-start pt-1">
                <div className="bg-gray-100 p-2 rounded-md">
                  <BookOpen className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-medium text-gray-900">{education.degree}</h4>
                    <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                      <div className="flex items-center mr-4">
                        <Building className="mr-1 h-4 w-4 text-gray-400" />
                        {education.institution}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                        {formatDate(education.startDate)} - {formatDate(education.endDate)}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(education)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeEducation(education.id)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded-md hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
          <p>No education added yet</p>
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 border border-gray-200 rounded-md p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                type="text"
                name="degree"
                id="degree"
                required
                value={formData.degree}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="e.g., Bachelor of Science in Computer Science"
              />
            </div>
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <input
                type="text"
                name="institution"
                id="institution"
                required
                value={formData.institution}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="e.g., Stanford University"
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
                I am currently studying here
              </label>
            </div>
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
              {editingId ? 'Update Education' : 'Add Education'}
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
          Add Education
        </button>
      )}
    </div>
  );
};

export default EducationForm;