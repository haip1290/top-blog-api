const handleUserNotFoundError = (errorCode, id) => {
  if (errorCode === "P2025") {
    throw new Error(`User with id ${id} not found`);
  }
};
const handleUserExistsError = (errorCode, email) => {
  if (errorCode === "P2002") {
    throw new Error(`User with email ${email} already exists`);
  }
};

const handleAuthorNotFoundError = (errorCode, id) => {
  if (errorCode === "P2003") {
    throw new Error(`Author not found ${id}`);
  }
};

export {
  handleUserExistsError,
  handleUserNotFoundError,
  handleAuthorNotFoundError,
};
