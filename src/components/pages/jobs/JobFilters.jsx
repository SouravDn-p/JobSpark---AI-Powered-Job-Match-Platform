import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Input from '../common/Input'
import Button from '../common/Button'
import { FaFilter, FaTimes, FaSearch, FaMapMarkerAlt } from 'react-icons/fa'

const JobFilters = ({ filters, onFilterChange, onClearFilters, onSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLocalFilters(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onFilterChange(localFilters)
    onSubmit && onSubmit()
  }
  
  const handleClear = () => {
    const emptyFilters = {
      search: '',
      location: '',
      category: '',
      experience: '',
      jobType: ''
    }
    setLocalFilters(emptyFilters)
    onClearFilters && onClearFilters()
  }
  
  const toggleExpand = () => setIsExpanded(!isExpanded)
  
  // Category options
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'software-development', label: 'Software Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'customer-support', label: 'Customer Support' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ]
  
  // Experience level options
  const experienceLevels = [
    { value: '', label: 'Any Experience' },
    { value: 'entry-level', label: 'Entry Level' },
    { value: 'mid-level', label: 'Mid Level' },
    { value: 'senior', label: 'Senior' },
    { value: 'executive', label: 'Executive' }
  ]
  
  // Job type options
  const jobTypes = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote' }
  ]
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300">
      <form onSubmit={handleSubmit}>
        {/* Always visible basic filters */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              id="search"
              name="search"
              placeholder="Job title, skills, or keywords"
              value={localFilters.search}
              onChange={handleInputChange}
              icon={<FaSearch />}
            />
            
            <Input
              id="location"
              name="location"
              placeholder="City, state, or remote"
              value={localFilters.location}
              onChange={handleInputChange}
              icon={<FaMapMarkerAlt />}
            />
            
            <div className="flex space-x-2">
              <Button 
                type="submit"
                variant="primary"
                fullWidth
              >
                Search
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={toggleExpand}
                icon={<FaFilter />}
                aria-expanded={isExpanded}
              >
                <span className="sr-only md:not-sr-only md:inline-block">
                  Filters
                </span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Expandable advanced filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 bg-gray-50"
            >
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={localFilters.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition duration-200"
                    >
                      {categories.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={localFilters.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition duration-200"
                    >
                      {experienceLevels.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type
                    </label>
                    <select
                      id="jobType"
                      name="jobType"
                      value={localFilters.jobType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition duration-200"
                    >
                      {jobTypes.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="small"
                    onClick={handleClear}
                    icon={<FaTimes />}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}

export default JobFilters