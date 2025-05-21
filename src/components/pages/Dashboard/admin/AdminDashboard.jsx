// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBriefcase,
//   FaUsers,
//   FaChartLine,
//   FaClock,
//   FaEdit,
// } from "react-icons/fa";
// import Card from "../../common/Card";
// import Button from "../../common/Button";
// import LoadingSpinner from "../../common/LoadingSpinner";
// import useAuth from "../../../hooks/useAuth";

// // Mock user data
// const mockUsers = [
//   {
//     _id: "mock1",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     isAdmin: false,
//     createdAt: "2023-05-01",
//   },
//   {
//     _id: "mock2",
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     isAdmin: true,
//     createdAt: "2023-05-10",
//   },
//   {
//     _id: "mock3",
//     name: "Alex Johnson",
//     email: "alex.johnson@example.com",
//     isAdmin: false,
//     createdAt: "2023-05-15",
//   },
// ];

// // Mock job data
// const mockJobs = [
//   {
//     _id: "job1",
//     title: "Software Engineer",
//     company: "Tech Corp",
//     location: "San Francisco, CA",
//     type: "Full-Time",
//     remote: true,
//     active: true,
//     applications: [1, 2, 3],
//   },
//   {
//     _id: "job2",
//     title: "Product Manager",
//     company: "Innovate Inc",
//     location: "New York, NY",
//     type: "Full-Time",
//     remote: false,
//     active: true,
//     applications: [1],
//   },
//   {
//     _id: "job3",
//     title: "UX Designer",
//     company: "Design Studio",
//     location: "Remote",
//     type: "Contract",
//     remote: true,
//     active: false,
//     applications: [],
//   },
// ];

// const AdminDashboard = () => {
//   const { dbUser, isDarkMode } = useAuth();
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [metrics, setMetrics] = useState({
//     totalJobs: 0,
//     totalUsers: 0,
//     activeJobs: 0,
//     recentApplications: 0,
//   });

//   // Restrict access to admins
//   useEffect(() => {
//     if (!dbUser?.isAdmin) {
//       navigate("/dashboard");
//     }
//   }, [dbUser, navigate]);

//   // Set hardcoded data and calculate metrics
//   useEffect(() => {
//     try {
//       setLoading(true);
//       setError("");

//       // Use mock data
//       const usersData = mockUsers;
//       const jobsData = mockJobs;

//       setUsers(usersData);

//       // Calculate metrics
//       const totalJobs = jobsData.length;
//       const activeJobs = jobsData.filter((job) => job.active).length;
//       const recentApplications = jobsData.reduce(
//         (sum, job) => sum + (job.applications?.length || 0),
//         0
//       );

//       setMetrics({
//         totalJobs,
//         totalUsers: usersData.length,
//         activeJobs,
//         recentApplications,
//       });
//     } catch (err) {
//       console.error("Error processing mock data:", err);
//       setError("Failed to load dashboard data.");
//       setUsers(mockUsers); // Fallback to mock users
//       const totalJobs = mockJobs.length;
//       const activeJobs = mockJobs.filter((job) => job.active).length;
//       const recentApplications = mockJobs.reduce(
//         (sum, job) => sum + (job.applications?.length || 0),
//         0
//       );
//       setMetrics({
//         totalJobs,
//         totalUsers: mockUsers.length,
//         activeJobs,
//         recentApplications,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Format date string
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   if (!dbUser?.isAdmin) {
//     return null; // Redirect handled by useEffect
//   }

//   if (loading) {
//     return (
//       <div
//         className={`flex justify-center items-center min-h-screen pt-16 ${
//           isDarkMode ? "bg-gray-900" : "bg-gray-50"
//         }`}
//       >
//         <LoadingSpinner size="large" text="Loading admin dashboard..." />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         className={`flex justify-center items-center min-h-screen pt-16 ${
//           isDarkMode ? "bg-gray-900" : "bg-gray-50"
//         }`}
//       >
//         <div
//           className={`p-4 rounded-lg ${
//             isDarkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"
//           }`}
//         >
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`pt-20 pb-10 min-h-screen ${
//         isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
//           <p
//             className={`text-sm ${
//               isDarkMode ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             Manage jobs, users, and platform activity (Using mock data)
//           </p>
//         </motion.div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.1 }}
//           >
//             <Card
//               className={`p-6 ${
//                 isDarkMode
//                   ? "bg-gray-800 border-gray-700"
//                   : "bg-white border-gray-200"
//               }`}
//             >
//               <div className="flex items-center">
//                 <div
//                   className={`p-3 rounded-full ${
//                     isDarkMode
//                       ? "bg-blue-900 text-blue-400"
//                       : "bg-blue-100 text-blue-800"
//                   }`}
//                 >
//                   <FaBriefcase className="h-5 w-5" />
//                 </div>
//                 <div className="ml-4">
//                   <h3
//                     className={`text-sm font-medium ${
//                       isDarkMode ? "text-gray-400" : "text-gray-500"
//                     }`}
//                   >
//                     Total Jobs
//                   </h3>
//                   <p className="text-2xl font-semibold">{metrics.totalJobs}</p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.2 }}
//           >
//             <Card
//               className={`p-6 ${
//                 isDarkMode
//                   ? "bg-gray-800 border-gray-700"
//                   : "bg-white border-gray-200"
//               }`}
//             >
//               <div className="flex items-center">
//                 <div
//                   className={`p-3 rounded-full ${
//                     isDarkMode
//                       ? "bg-green-900 text-green-400"
//                       : "bg-green-100 text-green-800"
//                   }`}
//                 >
//                   <FaUsers className="h-5 w-5" />
//                 </div>
//                 <div className="ml-4">
//                   <h3
//                     className={`text-sm font-medium ${
//                       isDarkMode ? "text-gray-400" : "text-gray-500"
//                     }`}
//                   >
//                     Total Users
//                   </h3>
//                   <p className="text-2xl font-semibold">{metrics.totalUsers}</p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.3 }}
//           >
//             <Card
//               className={`p-6 ${
//                 isDarkMode
//                   ? "bg-gray-800 border-gray-700"
//                   : "bg-white border-gray-200"
//               }`}
//             >
//               <div className="flex items-center">
//                 <div
//                   className={`p-3 rounded-full ${
//                     isDarkMode
//                       ? "bg-purple-900 text-purple-400"
//                       : "bg-purple-100 text-purple-800"
//                   }`}
//                 >
//                   <FaChartLine className="h-5 w-5" />
//                 </div>
//                 <div className="ml-4">
//                   <h3
//                     className={`text-sm font-medium ${
//                       isDarkMode ? "text-gray-400" : "text-gray-500"
//                     }`}
//                   >
//                     Active Jobs
//                   </h3>
//                   <p className="text-2xl font-semibold">{metrics.activeJobs}</p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.4 }}
//           >
//             <Card
//               className={`p-6 ${
//                 isDarkMode
//                   ? "bg-gray-800 border-gray-700"
//                   : "bg-white border-gray-200"
//               }`}
//             >
//               <div className="flex items-center">
//                 <div
//                   className={`p-3 rounded-full ${
//                     isDarkMode
//                       ? "bg-yellow-900 text-yellow-400"
//                       : "bg-yellow-100 text-yellow-800"
//                   }`}
//                 >
//                   <FaClock className="h-5 w-5" />
//                 </div>
//                 <div className="ml-4">
//                   <h3
//                     className={`text-sm font-medium ${
//                       isDarkMode ? "text-gray-400" : "text-gray-500"
//                     }`}
//                   >
//                     Recent Applications
//                   </h3>
//                   <p className="text-2xl font-semibold">
//                     {metrics.recentApplications}
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Recent Jobs Section */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Card
//                 className={`${
//                   isDarkMode
//                     ? "bg-gray-800 border-gray-700"
//                     : "bg-white border-gray-200"
//                 }`}
//               >
//                 <div
//                   className={`px-6 py-4 border-b ${
//                     isDarkMode ? "border-gray-700" : "border-gray-200"
//                   } flex justify-between items-center`}
//                 >
//                   <h2
//                     className={`text-xl font-semibold flex items-center ${
//                       isDarkMode ? "text-gray-200" : "text-gray-800"
//                     }`}
//                   >
//                     <FaBriefcase
//                       className={`mr-2 ${
//                         isDarkMode ? "text-blue-400" : "text-blue-600"
//                       }`}
//                     />
//                     Recent Jobs
//                   </h2>
//                   <Link
//                     to="/admin/jobs"
//                     className={`text-sm font-medium ${
//                       isDarkMode
//                         ? "text-blue-400 hover:text-blue-300"
//                         : "text-blue-600 hover:text-blue-700"
//                     }`}
//                   >
//                     Manage Jobs
//                   </Link>
//                 </div>
//                 <div className="p-6">
//                   {mockJobs.length > 0 ? (
//                     <div className="space-y-4">
//                       {mockJobs.slice(0, 3).map((job) => (
//                         <div
//                           key={job._id}
//                           className={`border rounded-lg p-4 flex justify-between items-center hover:shadow-sm transition-shadow ${
//                             isDarkMode
//                               ? "bg-gray-800 border-gray-700"
//                               : "bg-white border-gray-200"
//                           }`}
//                         >
//                           <div>
//                             <h3
//                               className={`font-medium ${
//                                 isDarkMode ? "text-gray-200" : "text-gray-900"
//                               }`}
//                             >
//                               {job.title}
//                             </h3>
//                             <p
//                               className={`text-sm ${
//                                 isDarkMode ? "text-gray-400" : "text-gray-600"
//                               }`}
//                             >
//                               {job.company} | {job.location || "N/A"} |{" "}
//                               {job.type}
//                               {job.remote && " | Remote"}
//                             </p>
//                           </div>
//                           <Button
//                             onClick={() => navigate(`/admin/jobs`)}
//                             variant="outline"
//                             size="small"
//                             className={`${
//                               isDarkMode
//                                 ? "border-gray-600 text-gray-200 hover:bg-gray-700"
//                                 : "border-gray-300 text-gray-700 hover:bg-gray-100"
//                             }`}
//                           >
//                             <FaEdit className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       ))}
//                       <div className="mt-4 text-center">
//                         <Button
//                           to="/admin/jobs"
//                           variant="outline"
//                           className={`animate__animated animate__zoomIn ${
//                             isDarkMode
//                               ? "border-gray-600 text-gray-200 hover:bg-gray-700"
//                               : "border-gray-300 text-gray-700 hover:bg-gray-100"
//                           }`}
//                         >
//                           View All Jobs
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-center py-8">
//                       <FaBriefcase
//                         className={`mx-auto h-12 w-12 ${
//                           isDarkMode ? "text-gray-600" : "text-gray-400"
//                         } mb-4`}
//                       />
//                       <h3
//                         className={`text-lg font-medium ${
//                           isDarkMode ? "text-gray-200" : "text-gray-900"
//                         } mb-2`}
//                       >
//                         No jobs listed
//                       </h3>
//                       <p
//                         className={`text-sm ${
//                           isDarkMode ? "text-gray-400" : "text-gray-500"
//                         } mb-4`}
//                       >
//                         Add new jobs to get started
//                       </p>
//                       <Button
//                         to="/admin/jobs"
//                         variant="primary"
//                         className={`animate__animated animate__zoomIn ${
//                           isDarkMode
//                             ? "bg-blue-400 hover:bg-blue-500 text-white"
//                             : "bg-blue-600 hover:bg-blue-700 text-white"
//                         }`}
//                       >
//                         Add Job
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </Card>
//             </motion.div>
//           </div>

//           {/* Recent Users Section */}
//           <div className="lg:col-span-1">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Card
//                 className={`${
//                   isDarkMode
//                     ? "bg-gray-800 border-gray-700"
//                     : "bg-white border-gray-200"
//                 }`}
//               >
//                 <div
//                   className={`px-6 py-4 border-b ${
//                     isDarkMode ? "border-gray-700" : "border-gray-200"
//                   } flex justify-between items-center`}
//                 >
//                   <h2
//                     className={`text-xl font-semibold flex items-center ${
//                       isDarkMode ? "text-gray-200" : "text-gray-800"
//                     }`}
//                   >
//                     <FaUsers
//                       className={`mr-2 ${
//                         isDarkMode ? "text-blue-400" : "text-blue-600"
//                       }`}
//                     />
//                     Recent Users
//                   </h2>
//                   <Link
//                     to="/admin/users"
//                     className={`text-sm font-medium ${
//                       isDarkMode
//                         ? "text-blue-400 hover:text-blue-300"
//                         : "text-blue-600 hover:text-blue-700"
//                     }`}
//                   >
//                     Manage Users
//                   </Link>
//                 </div>
//                 <div className="p-6">
//                   {users.length > 0 ? (
//                     <div className="space-y-3">
//                       {users.slice(0, 3).map((user) => (
//                         <div
//                           key={user._id}
//                           className={`border rounded-lg p-4 hover:shadow-sm transition-shadow ${
//                             isDarkMode
//                               ? "bg-gray-800 border-gray-700"
//                               : "bg-white border-gray-200"
//                           }`}
//                         >
//                           <div className="flex justify-between">
//                             <div>
//                               <h3
//                                 className={`font-medium ${
//                                   isDarkMode ? "text-gray-200" : "text-gray-900"
//                                 }`}
//                               >
//                                 {user.name}
//                               </h3>
//                               <p
//                                 className={`text-sm ${
//                                   isDarkMode ? "text-gray-400" : "text-gray-600"
//                                 }`}
//                               >
//                                 {user.email}
//                               </p>
//                             </div>
//                             <span
//                               className={`text-xs px-2 py-1 rounded-full ${
//                                 user.isAdmin
//                                   ? isDarkMode
//                                     ? "bg-green-900 text-green-400"
//                                     : "bg-green-100 text-green-800"
//                                   : isDarkMode
//                                   ? "bg-gray-700 text-gray-300"
//                                   : "bg-gray-100 text-gray-800"
//                               }`}
//                             >
//                               {user.isAdmin ? "Admin" : "User"}
//                             </span>
//                           </div>
//                           <p
//                             className={`mt-2 text-xs ${
//                               isDarkMode ? "text-gray-500" : "text-gray-500"
//                             }`}
//                           >
//                             Joined: {formatDate(user.createdAt)}
//                           </p>
//                         </div>
//                       ))}
//                       <div className="mt-4 text-center">
//                         <Button
//                           to="/admin/users"
//                           variant="outline"
//                           className={`animate__animated animate__zoomIn ${
//                             isDarkMode
//                               ? "border-gray-600 text-gray-200 hover:bg-gray-700"
//                               : "border-gray-300 text-gray-700 hover:bg-gray-100"
//                           }`}
//                         >
//                           View All Users
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-center py-6">
//                       <FaUsers
//                         className={`mx-auto h-12 w-12 ${
//                           isDarkMode ? "text-gray-600" : "text-gray-400"
//                         } mb-4`}
//                       />
//                       <h3
//                         className={`text-lg font-medium ${
//                           isDarkMode ? "text-gray-200" : "text-gray-900"
//                         } mb-2`}
//                       >
//                         No users found
//                       </h3>
//                       <p
//                         className={`text-sm ${
//                           isDarkMode ? "text-gray-400" : "text-gray-500"
//                         }`}
//                       >
//                         No users have registered yet.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </Card>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
