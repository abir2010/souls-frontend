import { useMutation } from "@tanstack/react-query";
import { Loader2, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

const Login = () => {
  // React Router's navigation hook
  const navigate = useNavigate();

  // Zustand auth store for managing authentication state
  const { login, isAuthenticated } = useAuthStore();

  // Local state for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // If they are already logged in, instantly kick them to the dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  // Handle input changes for both email and password fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // React Query mutation for logging in the admin
  const loginMutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      // Save the token in Zustand (which also saves to localStorage)
      login(data.token);

      // Redirect to the admin dashboard
      navigate("/admin");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  // If already authenticated, don't render the login form (prevents UI flash before redirect)
  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 md:p-10 border border-gray-100 shadow-xl">
        {/* Branding */}
        <div className="text-center mb-10">
          <h1 className="font-display font-bold text-3xl tracking-tight text-brand-primary">
            Souls<span className="text-brand-accent">Admin</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to manage your store
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-primary">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white transition-all"
                placeholder="admin@soulslifestyle.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-primary">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Error Message */}
          {loginMutation.isError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 border border-red-100 text-center font-medium">
              {loginMutation.error?.response?.data?.message ||
                "Invalid email or password"}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-brand-primary text-white py-4 font-semibold hover:bg-brand-accent transition-colors flex justify-center items-center gap-2 uppercase tracking-widest text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
