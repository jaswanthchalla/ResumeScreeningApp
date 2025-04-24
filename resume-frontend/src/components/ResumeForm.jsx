import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResumeForm() {
    const [jobDescription, setJobDescription] = useState('');
    const [resumes, setResumes] = useState([]);
    const [results, setResults] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setResumes(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isUploaded) {
            // If upload is complete, navigate to results
            navigate('/results', { state: { results } });
            return;
        }

        const formData = new FormData();
        formData.append('job_description', jobDescription);
        for (let i = 0; i < resumes.length; i++) {
            formData.append('resumes', resumes[i]);
        }

        try {
            setIsUploading(true);

            const response = await axios.post(
                'https://jaswanthch-resume-screener.hf.space/screen/',
                formData
            );

            setResults(response.data);
            setIsUploading(false);
            setIsUploaded(true);
        } catch (error) {
            console.error('Error uploading:', error);
            setIsUploading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <textarea
                    placeholder="Paste the Job Description here..."
                    rows="6"
                    className="w-full border border-gray-300 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                />

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
                    <p className="mb-2 text-gray-600">Drop your resume here or click to upload</p>
                    <input
                        type="file"
                        multiple
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                        required
                        className="mx-auto text-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-1">PDF & DOCX only. Max 2MB file size.</p>
                    {resumes.length > 0 && (
                        <ul className="mt-3 text-sm text-gray-600 text-left">
                            {Array.from(resumes).map((file, index) => (
                                <li key={index} className="truncate">
                                    📄 {file.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isUploading}
                    className={`w-full flex justify-center items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition ${isUploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {isUploading
                        ? 'Evaluating...'
                        : isUploaded
                            ? 'Check Results'
                            : 'Rank the resumes'}
                </button>

                <p className="text-sm text-gray-400 text-center">
                    <span className="inline-block align-middle">🔒</span> Privacy guaranteed
                </p>
            </form>

        </div>
    );
}

export default ResumeForm;
