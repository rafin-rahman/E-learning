export function checkRole(
  currentRoute: string,
  userRole: string[],
  route: string,
  allowedRoles: string[]
) {
  if (currentRoute === route && !allowedRoles.includes(userRole[0])) {
    return "/unauthorized";
  }
  return null;
}
