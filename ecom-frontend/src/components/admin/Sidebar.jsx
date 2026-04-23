import React from "react";
import { FaBoxOpen, FaStore, FaTachometerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { adminNavigation } from "../../utils";
import classNames, { ClassNames } from "classnames";

const Sidebar = ({ isProfileLayout = false }) => {
  const pathName = useLocation().pathname;
  const { user } = useSelector((state) => state.auth);

  const sideBarLayout = adminNavigation;

  return (
    <aside className="h-screen w-64 bg-custom-gradient text-white shadow-2xl flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b ">
        <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
        <p className="text-xs text-indigo-200 mt-1">Management Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {adminNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link key={item.name} to={item.href}>
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-indigo-600 shadow-lg"
                      : "hover:bg-indigo-700/60"
                  }`}
                  >
                <Icon
                  className={`text-lg transition-colors duration-200
                    ${
                      isActive
                        ? "text-white"
                        : "text-indigo-300 group-hover:text-white"
                    }`}
                />

                <span
                  className={`text-sm font-medium tracking-wide
                    ${
                      isActive
                        ? "text-white"
                        : "text-indigo-200 group-hover:text-white"
                    }`}
                >
                  {item.name}
                </span>

                {isActive && (
                  <div
                    className="ml-auto h-2 w-2 rounded-full bg-white"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t text-xs text-indigo-200">
        <p>© 2026 Admin System</p>
        <p className="mt-1">Version 1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
