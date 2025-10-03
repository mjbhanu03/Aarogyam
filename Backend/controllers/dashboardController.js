// backend/controllers/dashboardController.js

// @desc    Get dashboard data for the logged-in user
// @route   GET /api/dashboard
export const getDashboardData = async (req, res) => {
  // The req.user object is available because of our 'protect' middleware
  const user = req.user;

  try {
    if (user.role === 'student') {
      // For a student, you might fetch their upcoming appointments, etc.
      // For now, let's send some mock data.
      const studentData = {
        welcomeMessage: `Welcome back, ${user.name}!`,
        upcomingAppointments: 2, // Mock data
        suggestedResources: 3, // Mock data
      };
      res.json(studentData);

    } else if (user.role === 'admin') {
      // For an admin, you would aggregate data from the entire system.
      const totalStudents = await User.countDocuments({ role: 'student' });
      const adminData = {
        welcomeMessage: `Admin Dashboard - Welcome, ${user.name}!`,
        totalStudents: totalStudents,
        totalAppointments: 50, // Mock data
        distressCalls: 5, // Mock data
      };
      res.json(adminData);
    } else {
        res.status(403).json({ message: "Role not supported for dashboard" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};