import React from "react";
import Overview from "./Overview";
import ChatPage from "../Chat-System/ChatPage";

const MainContent = ({ isSidebarCollapsed, activeTab, user }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview user={user} />;
      case "Let's-Chat":
        return <ChatPage user={user} />;
      default:
        return (
          <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
            Select a tab from the sidebar to get started.
          </p>
        );
    }
  };

  return (
    <main
      className={`flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300 ${
        isSidebarCollapsed ? "ml-16" : "ml-64"
      } p-6`}
    >
      {renderTabContent()}
    </main>
  );
};

export default MainContent;
