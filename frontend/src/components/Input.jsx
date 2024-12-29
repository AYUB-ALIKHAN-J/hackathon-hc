const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='relative mb-6'>
		  {/* Icon Container */}
		  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
			<Icon className='w-5 h-5 text-[#007074]' /> {/* Change icon color to #007074 */}
		  </div>
	  
		  {/* Input Field */}
		  <input
			{...props}
			className='w-full pl-10 pr-3 py-2 bg-gray-50 rounded-lg border border-[#007074] focus:border-[#007074] focus:ring-2 focus:ring-[#007074] text-gray-800 placeholder-gray-400 shadow-sm transition duration-200'
		  />
		</div>
	  );
	  
};
export default Input;
