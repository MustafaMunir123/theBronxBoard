import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, UserPlus, ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import { useAuth } from "../contexts/AuthContext";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password, role);
      navigate("/signin");
    } catch (err) {
      setError("Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-gray-600">
            Join BronxEdu and start your educational journey
          </p>
        </div>

        <Card padding="lg" className="mt-8">
          {error && (
            <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="User name"
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              icon={<User className="h-5 w-5 text-gray-400" />}
              autoComplete="name"
            />

            <Input
              label="Email address"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              autoComplete="new-password"
              helpText="Must be at least 8 characters"
            />

            <Input
              label="Confirm password"
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              autoComplete="new-password"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a:
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="student"
                    name="role"
                    type="radio"
                    checked={role === "student"}
                    onChange={() => setRole("student")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label
                    htmlFor="student"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Student
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="teacher"
                    name="role"
                    type="radio"
                    checked={role === "teacher"}
                    onChange={() => setRole("teacher")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label
                    htmlFor="teacher"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Teacher
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              icon={<UserPlus className="h-5 w-5" />}
            >
              Sign up
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
