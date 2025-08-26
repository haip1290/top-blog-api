/**
 * @description Middleware to check if the authenticated user has the required role.
 * Assume req.user contain authenticated user
 *
 * @param {string} requiredRole - The role required to access the route (e.g., 'AUTHOR', 'ADMIN').
 * @returns {Function} Express middleware function.
 */

const hasRole = (requiredRole) => (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Authentication required." });
  }
  if (user.role && user.role === requiredRole) {
    next();
  } else {
    return res.status(401).json({ message: "Insufficient permission." });
  }
};

export default hasRole;
