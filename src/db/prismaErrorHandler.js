const handleResourcerNotFoundError = (
  errorCode,
  { resourceName, resourceData }
) => {
  if (errorCode === "P2025") {
    throw new Error(`${resourceName} with ${resourceData} not found`);
  }
};
const handleResourceExistsError = (
  errorCode,
  { resourceName, resourceData }
) => {
  if (errorCode === "P2002") {
    throw new Error(`${resourceName} with ${resourceData} already exists`);
  }
};

const handleConstraintNotFoundError = (
  errorCode,
  { resourceName, resourceData }
) => {
  if (errorCode === "P2003") {
    throw new Error(`${resourceName} with ${resourceData} not found`);
  }
};

export {
  handleResourceExistsError,
  handleResourcerNotFoundError,
  handleConstraintNotFoundError,
};
