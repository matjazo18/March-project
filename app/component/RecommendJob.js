import React from 'react';
 // Optional: Add CSS for additional styling if needed

const RecommendJob = () => {
    return (

        <div>
            <h1 className='flex justify-center font-extrabold text-center text-3xl'> Recommended Jobs</h1>
            <div className="flex justify-center space-x-4 items-center p-5">
                
                <div className="w-36 h-36 bg-gray-100 flex justify-center items-center border border-gray-300 rounded-lg shadow-md">
                    Job 1
                </div>
                <div className="w-36 h-36 bg-gray-100 flex justify-center items-center border border-gray-300 rounded-lg shadow-md">
                    Job 2
                </div>
                <div className="w-36 h-36 bg-gray-100 flex justify-center items-center border border-gray-300 rounded-lg shadow-md">
                    Job 3
                </div>
            </div>
        </div>
    );
};

export default RecommendJob;