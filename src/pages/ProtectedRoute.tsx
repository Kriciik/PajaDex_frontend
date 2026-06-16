import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, Outlet } from "react-router";

const URL = import.meta.env.VITE_BACKEND_URL;
const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(URL + "/auth/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

export function ProtectedRoute() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
