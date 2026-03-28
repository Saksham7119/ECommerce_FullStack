import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Backdrop } from "./Backdrop";
import { logoutUser } from "../store/actions";

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch =  useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
   dispatch(logoutUser(navigate))
  };

  return (
    <div className="relative z-30">
      <div
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar alt="menu" src="" />
      </div>
      <Menu
        sx={{ width: "400px", 
            marginTop : "50px"
        }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >

        <Link to="/profile">
          <MenuItem onClick={handleClose} className="flex gap-2">
            <FaUser className="text-xl" />
            <span className="font-bold text-[16px] mt-1">{user?.username}</span>
          </MenuItem>
        </Link>
        <Link to="/profile/orders">
          <MenuItem onClick={handleClose} className="flex gap-2">
            <FaShoppingCart className="text-xl" />
            <span className="font-semibold"> Orders</span>
          </MenuItem>
        </Link>
        <MenuItem onClick={logoutHandler} className="flex gap-2">
          <div className="rounded-md bg-rose-600 text-white flex items-center py-2 px-4" onClick={logoutHandler}>
            <IoMdExit className="text-xl mr-1" />
            <span className=""> Logout</span>
          </div>
        </MenuItem>
      </Menu>

      {open && <Backdrop/>}
    </div>
  );
};
