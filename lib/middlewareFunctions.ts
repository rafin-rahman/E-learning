export function checkRole(
  currentRoute: string,
  userRole: string[],
  route: string,
  allowedRoles: string[]
) {
  console.log("checkRole function ");
  console.log("currentRoute", currentRoute);
  console.log("route", route);
  if (currentRoute === route && !allowedRoles.includes(userRole[0])) {
    console.log("redirect to /dashboard");
    return "/dashboard";
  }
  return null;
}
