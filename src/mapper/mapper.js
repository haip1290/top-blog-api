const userToDto = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
});

export { userToDto };
