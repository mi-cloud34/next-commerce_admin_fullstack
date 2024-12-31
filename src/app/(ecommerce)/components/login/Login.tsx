"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser } from "@/redux/Features/userSlice";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import Input from "../general/input";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const LoginClient = () => {
  const [token, setToken] = useState<string | null>(null); // Token için state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Şifre görünürlük durumu
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/users/login",
        { email, password },
        {
          validateStatus: (status) => status < 500,
        }
      );

      if (res.status === 403 && res.data.redirectTo) {
        router.push(res.data.redirectTo);
      }
      if (res.status === 200) {
        console.log("Login response:", res);
        
        setToken(res.data.token);
        router.push("/");
        toast.success("Login successfully...");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const user = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        dispatch(setUser(user.data));
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [token, dispatch]);

  return (
    <div className="flex items-center justify-center  min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white bg-opacity-50 border border-indigo-500 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-indigo-500 text-transparent bg-clip-text">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center mb-6">
              <Button
                onClick={() => router.push("/forgotpassword")}
                className="text-sm text-indigo-400 hover:underline"
              >
                Forgot password?
              </Button>
            </div>
            {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="w-6 h-6 animate-spin  mx-auto" /> : "Login"}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-white bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Button
              onClick={() => router.push("/register")}
              className="text-indigo-400 hover:underline"
            >
              Sign up
            </Button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginClient;
