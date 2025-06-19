// RoleTabs.jsx (Tailwind Redesigned)
import React from 'react';
import { motion } from 'framer-motion';

const roles = ['patient', 'doctor', 'chemist', 'hospital'];

const RoleTabs = ({ selectedRole, onSelectRole }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      {roles.map((role) => (
        <motion.button
          key={role}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-2 rounded-full border transition-colors duration-300 font-semibold capitalize
            ${selectedRole === role
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          onClick={() => onSelectRole(role)}
        >
          {role}
        </motion.button>
      ))}
    </div>
  );
};

export default RoleTabs;
