import type { SidebarHandlers } from "../types/SidebarTypes";

export const useSidebarHandlers = (): SidebarHandlers => {
  const handleLogout = () => {
    console.log("Logout requested");
    // TODO: Implement logout logic
  };

  const handleDeleteAccount = () => {
    console.log("Delete account requested");
    // TODO: Implement delete account logic
  };

  return {
    onLogout: handleLogout,
    onDeleteAccount: handleDeleteAccount,
  };
};
