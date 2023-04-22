import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function LogOut() {
  const { setToken } = useAuth();
}
