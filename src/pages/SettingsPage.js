import { motion } from "framer-motion";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../firebase/AuthenticationContext";

const SettingsPage = () => {
  const { logoutUser, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-auto relative z-10">
        <Nav title="Settings" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
              <div className="flex items-center space-x-4">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt="User avatar"
                />
                <div>
                  <p className="text-gray-400">
                    Logged in as: {currentUser?.email || "Guest"}
                  </p>
                  <p className="text-gray-400">
                    Name: {currentUser?.displayName || "Anonymous"}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-red-500 transition-all">
              Logout
            </button>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
