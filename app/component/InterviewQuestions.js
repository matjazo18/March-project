 export default function InterviewQuestions({filterElements}) {
    return(
    <div> 
        <h1 className="flex justify-center font-extrabold text-center text-3xl"> Generate Interview Questions </h1>
        <div className="flex justify-center space-x-4 items-center p-5">
                
                <div className="w-36 h-36 bg-gray-100 flex justify-center items-center border border-gray-300 rounded-lg shadow-md">
                    Q1
                </div>
                <div className="w-36 h-36 bg-gray-100 flex justify-center items-center border border-gray-300 rounded-lg shadow-md">
                    Q2
                </div>
                <div className="w-36 h-36 bg-gray-100 flex justify-center items-center border border-gray-300 rounded-lg shadow-md">
                    Q3
                </div>
            </div>
    </div>
)
 }