export const AccessControl = ({ children, allowedRoles, currentRole }) => {
   return allowedRoles.includes(currentRole) ? children : null;
};
