import React from "react";
import { motion } from "framer-motion";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import StatCard from "../component/StatCard";
import UsersTable from "../users/UserTable";
import Sidebar from "../component/Sidebar"; // Import the Sidebar component
import Nav from "../component/Nav"; // Import Nav component for consistent navigation

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

const UsersPage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="flex-1 overflow-auto relative z-10">
        <Nav title="Users" /> {/* Add the Nav component for consistent title */}
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
            <StatCard
              name="Total Users"
              icon={UsersIcon}
              value={userStats.totalUsers.toLocaleString()}
              color="#6366F1"
            />
            <StatCard
              name="New Users Today"
              icon={UserPlus}
              value={userStats.newUsersToday}
              color="#10B981"
            />
            <StatCard
              name="Active Users"
              icon={UserCheck}
              value={userStats.activeUsers.toLocaleString()}
              color="#F59E0B"
            />
            <StatCard
              name="Churn Rate"
              icon={UserX}
              value={userStats.churnRate}
              color="#EF4444"
            />
          </motion.div>
          <UsersTable />
        </main>
      </div>
    </div>
  );
};

export default UsersPage;
