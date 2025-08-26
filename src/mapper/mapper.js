/**
 *@description function which map user object to DTO to filter out sensitve info
 * @param {object} user
 * @returns {object} user DTO contain only safe info
 */

const userToDto = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
});

export { userToDto };
