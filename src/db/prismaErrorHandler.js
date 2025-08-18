const handleResourcerNotFoundError = (errorCode, field, resourceName) => {
  if (errorCode === "P2025") {
    throw new Error(`${resourceName} with id ${field} not found`);
  }
};
const handleResourceExistsError = (errorCode, field, resourceName) => {
  if (errorCode === "P2002") {
    throw new Error(`${resourceName} with email ${field} already exists`);
  }
};

const handleConstraintNotFoundError = (errorCode, field, resourceName) => {
  if (errorCode === "P2003") {
    throw new Error(`${resourceName} with ${field} not found`);
  }
};

export {
  handleResourceExistsError,
  handleResourcerNotFoundError,
  handleConstraintNotFoundError,
};
