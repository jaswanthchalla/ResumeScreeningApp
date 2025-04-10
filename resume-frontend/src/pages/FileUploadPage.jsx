import React from 'react';
import ResumeForm from '../components/ResumeForm';

function FileUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fcfb] via-[#e6f0fa] to-[#eae6fa] flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
            Hiring? Let NLP Do the Heavy Lifting
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
            Rank multiple resumes against your job description using cutting-edge NLP. Save time, shortlist better, and hire smarter.
        </p>

        <ResumeForm />
      </div>
    </div>
  );
}

export default FileUploadPage;