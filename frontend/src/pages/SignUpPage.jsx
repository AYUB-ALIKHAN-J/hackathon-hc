import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};
	return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='max-w-4xl w-full bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col lg:flex-row'
  >
    {/* Left Section: Text Content */}
    <div 
      className='w-full lg:w-1/2 text-white p-8 flex flex-col justify-center items-center text-center'
      style={{ backgroundColor: '#007074' }}  // Keep the left section's background color as #007074
    >
      <h2 className='text-3xl font-bold mb-4'>HomeConnect</h2>
      <p className='text-lg'>Your Personalized Relocation Partner</p>
    </div>

    {/* Right Section: Form */}
    <div className='w-full lg:w-1/2 p-8'>
      <h2 className='text-2xl font-bold mb-6 text-center text-gray-900'>
        Create Account
      </h2>

      <form onSubmit={handleSignUp} className='space-y-4'>
        {/* Input Fields */}
        <Input
          icon={User}
          type='text'
          placeholder='Full Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          icon={Mail}
          type='email'
          placeholder='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          icon={Lock}
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {error && (
          <p className='text-sm text-red-500 font-medium text-center'>{error}</p>
        )}

        {/* Password Strength Meter */}
        <PasswordStrengthMeter password={password} />

        {/* Submit Button */}
        <motion.button
          className='w-full py-3 px-4 bg-[#007074] text-white font-bold rounded-md shadow-md hover:bg-[#005c56] 
            focus:outline-none focus:ring-2 focus:ring-[#007074] focus:ring-offset-2 transition duration-200'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className='animate-spin mx-auto' size={24} />
          ) : (
            "Sign Up"
          )}
        </motion.button>
      </form>

      {/* Footer Section */}
      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-500'>
          Already have an account?{" "}
          <Link to={"/login"} className='text-[#007074] font-semibold hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  </motion.div>
);

	  
	  
	
	
	
};
export default SignUpPage;
