export const handleIsAuthenticated = (status: string): boolean => {
  if (status !== "authenticated") return false;
  return true;
};
