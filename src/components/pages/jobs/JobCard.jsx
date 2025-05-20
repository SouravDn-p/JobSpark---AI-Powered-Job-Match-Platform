import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import { FaBuilding, FaMapMarkerAlt, FaClock, FaBriefcase, FaStar, FaRegStar } from 'react-icons/fa'

const JobCard = ({ 
  job, 
  matchScore, 
  showMatchScore = false,
  showActions = true,
  isDetailed = false 
}) => {
  const [isSaved, setIsSaved] = useState(job.isSaved || false)
  
  const toggleSaved = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(!isSaved)
  }
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { 
      y: -5,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: { duration: 0.3 }
    }
  }
  
  // Function to render skill tags
  const renderSkillTags = (skills, limit = isDetailed ? skills.length : 3) => {
    const limitedSkills = skills.slice(0, limit)
    
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {limitedSkills.map((skill, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
            {skill}
          </span>
        ))}
        {skills.length > limit && !isDetailed && (
          <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
            +{skills.length - limit} more
          </span>
        )}
      </div>
    )
  }
  
  // Generate a gradient based on the match score
  const getMatchScoreGradient = (score) => {
    if (score >= 90) return 'from-green-500 to-green-600'
    if (score >= 80) return 'from-green-400 to-green-500'
    if (score >= 70) return 'from-blue-400 to-blue-500'
    if (score >= 60) return 'from-blue-300 to-blue-400'
    if (score >= 50) return 'from-yellow-400 to-yellow-500'
    return 'from-gray-400 to-gray-500'
  }
  
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={showActions ? "hover" : {}}
    >
      <Link to={`/jobs/${job.id}`} className="block h-full">
        <div className="p-6">
          {/* Header with Title and Company */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
              <div className="flex items-center text-gray-600">
                <FaBuilding className="mr-1" />
                <span>{job.company}</span>
              </div>
            </div>
            
            {/* Save button and match score */}
            <div className="flex flex-col items-end">
              {showActions && (
                <button onClick={toggleSaved} className="text-gray-400 hover:text-yellow-500 transition-colors">
                  {isSaved ? (
                    <FaStar className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <FaRegStar className="w-6 h-6" />
                  )}
                </button>
              )}
              
              {showMatchScore && (
                <div className="mt-2">
                  <div className={`text-xs font-bold text-white bg-gradient-to-r ${getMatchScoreGradient(matchScore)} py-1 px-3 rounded-full`}>
                    {matchScore}% Match
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Job details */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <FaClock className="mr-2 text-gray-500" />
              <span>{job.jobType}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <FaBriefcase className="mr-2 text-gray-500" />
              <span>{job.experience}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="font-medium text-primary-600">${job.salary.toLocaleString()}</span>
              <span className="text-gray-500 ml-1">/year</span>
            </div>
          </div>
          
          {/* Job description (shortened) */}
          {job.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {job.description}
            </p>
          )}
          
          {/* Skills */}
          {job.skills && job.skills.length > 0 && renderSkillTags(job.skills)}
          
          {/* CTA for detailed view */}
          {showActions && (
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Posted {job.postedDate}
              </span>
              <Button
                size="small"
                variant="outline"
                onClick={(e) => e.preventDefault()}
              >
                View Details
              </Button>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default JobCard