# JobSpark

JobSpark is a job recommendation platform that leverages AI to match job seekers with relevant job listings based on their profiles and preferences. This repository contains both backend and frontend code for the application.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [AI Usage and Prompt Design](#ai-usage-and-prompt-design)
- [API Documentation](#api-documentation)
- [Code Architecture Overview](#code-architecture-overview)

## Setup Instructions

### Prerequisites

- **Node.js**: Version 18.x or higher
- **MongoDB**: A running MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)
- **Hugging Face API Key**: Required for AI-powered recommendations
- **Firebase**: For frontend authentication (optional, if used)
- **Vite**: For frontend development and build

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd jobspark
   
   
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables: Create a .env file in the frontend**:
   ```bash
   npm run dev
   ```
3. **Run the Frontend**:
   ```bash
   npm run dev
   ```

### AI Integration
JobSpark utilizes the Hugging Face Inference API with the `Mixtral-8x7B-Instruct-v0.1` model to generate job recommendations. The AI analyzes user profiles, including skills, experience, education, and job preferences (such as job types, locations, salary range, and remote work preference), and matches them against job listings to identify the top 3 most relevant matches.

### Prompt Design
The `prepareRecommendationsData` function constructs a structured prompt for the AI model. The prompt includes:

- **User Profile**: Formatted details such as:
  - Name
  - Headline
  - Skills
  - Experience (e.g., job titles, companies, durations)
  - Education (e.g., degrees, institutions, years)
  - Job Preferences (job types, locations, salary range, remote work preference)
- **Job Listings**: Details of up to 20 recent jobs, including:
  - Job ID
  - Title
  - Company
  - Location
  - Job Type
  - Salary Range
  - Required Skills
  - Description
- **Instructions**: The AI is directed to return **only** a JSON object with an array of the top 3 job matches, each containing:
  - `job_id` (string): The MongoDB ObjectId of the job.
  - `match_score` (number): A score from 0 to 100 indicating match quality.

**Prompt Example**:
```text
I have a job seeker with the following profile:
Name: John Doe
Headline: Software Engineer
Skills: JavaScript, Python, React
Experience: Software Engineer at TechCorp (2 years); Intern at StartupInc (6 months)
Education: B.S. Computer Science at State University (2020)
Job Preferences: 
  Job Types: Full-time, Contract
  Locations: New York, Remote
  Salary Range: 80000 - 120000
  Remote: Yes

And these job listings:
Job ID: 12345
Title: Senior Developer
Company: BigTech
Location: New York
Job Type: Full-time
Salary Range: 100000-150000
Required Skills: JavaScript, Node.js
Description: Develop web applications...

[Additional job listings...]

Analyze the user's profile and job listings to find the top 3 matches. 
Return **only** a JSON object with an array of matches, where each match contains:
- job_id (string): The job ID
- match_score (number): A score from 0 to 100

Example response format:
{
  "matches": [
    { "job_id": "12345", "match_score": 80 },
    { "job_id": "67890", "match_score": 70 },
    { "job_id": "54321", "match_score": 60 }
  ]
}
