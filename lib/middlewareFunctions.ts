export function checkRole(
  currentRoute: string,
  userRoles: string[],
  route: string,
  allowedRoles: string[]
) {
  const routePattern = new RegExp("^" + route.replace(/:\w+\*/g, ".*") + "$");
  if (routePattern.test(currentRoute)) {
    const hasAccess = userRoles.some((role) => allowedRoles.includes(role));
    if (!hasAccess) {
      // log a descriptive message to the console
      console.log(
        `User with role ${userRoles[0]} tried to access ${currentRoute} but is not allowed`
      );

      return "/unauthorized";
    }
  }
  return null;
}
