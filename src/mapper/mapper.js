const userToDTO = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
});

export { userToDTO };
