import React, { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  suggestions?: string[];
}

const SkillsInput: React.FC<SkillsInputProps> = ({ skills, onChange, suggestions = [] }) => {
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Common tech skills for suggestions
  const defaultSuggestions = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Vue.js', 'Angular', 'HTML', 'CSS',
    'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'C#', '.NET', 'PHP', 'Laravel',
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Azure', 'Docker', 'Kubernetes',
    'Git', 'CI/CD', 'RESTful API', 'GraphQL', 'Agile', 'Scrum', 'UI/UX Design', 'Figma',
    'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Swift', 'iOS Development',
    'Android Development', 'Kotlin', 'Flutter', 'React Native', 'DevOps', 'Microservices',
    'System Design', 'Data Structures', 'Algorithms', 'Software Architecture'
  ];

  const allSuggestions = [...new Set([...suggestions, ...defaultSuggestions])].sort();
  
  useEffect(() => {
    if (input) {
      const filtered = allSuggestions
        .filter(suggestion => 
          suggestion.toLowerCase().includes(input.toLowerCase()) && 
          !skills.includes(suggestion)
        )
        .slice(0, 6);
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [input, allSuggestions, skills]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setIsMenuOpen(value.length > 0);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      addSkill(input.trim());
    } else if (e.key === 'Backspace' && !input && skills.length > 0) {
      // Remove the last skill when backspace is pressed and input is empty
      removeSkill(skills[skills.length - 1]);
    }
  };

  const addSkill = (skill: string) => {
    const formattedSkill = skill.trim();
    if (formattedSkill && !skills.includes(formattedSkill)) {
      const newSkills = [...skills, formattedSkill];
      onChange(newSkills);
      setInput('');
      setIsMenuOpen(false);
    }
  };

  const removeSkill = (skill: string) => {
    const newSkills = skills.filter(s => s !== skill);
    onChange(newSkills);
  };

  const selectSuggestion = (suggestion: string) => {
    addSkill(suggestion);
    setIsMenuOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center bg-primary-100 text-primary-800 text-sm px-2.5 py-0.5 rounded-full"
          >
            {skill}
            <button
              type="button"
              className="ml-1.5 text-primary-500 hover:text-primary-700 focus:outline-none"
              onClick={() => removeSkill(skill)}
            >
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Remove {skill}</span>
            </button>
          </span>
        ))}
        <div className="flex-1 relative min-w-[120px]">
          <input
            ref={inputRef}
            type="text"
            className="block w-full border-0 p-0 focus:ring-0 text-sm"
            placeholder={skills.length === 0 ? "Add skills (e.g., React, JavaScript, Python)" : "Add more skills"}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={() => input && setIsMenuOpen(true)}
          />
        </div>
      </div>
      
      {isMenuOpen && filteredSuggestions.length > 0 && (
        <div 
          ref={menuRef}
          className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm border border-gray-300"
        >
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 text-gray-900"
              onClick={() => selectSuggestion(suggestion)}
            >
              <span className="block truncate">{suggestion}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                <Plus className="h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsInput;