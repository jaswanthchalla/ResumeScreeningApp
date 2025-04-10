import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { CSVLink } from 'react-csv';

function ResultsPage() {
  const location = useLocation();
  // Extract 'results' from route state
  const { results } = location.state || { results: [] };

  // State for search text
  const [searchText, setSearchText] = useState('');

  // Filter logic
  const filteredResults = useMemo(() => {
    if (!searchText) return results;
    return results.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
      const skillsStr = item.matched_skills.join(' ').toLowerCase();
      const skillMatch = skillsStr.includes(searchText.toLowerCase());
      return nameMatch || skillMatch;
    });
  }, [results, searchText]);

  // CSV setup: define headers and transform data
  const csvHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Matched Skills', key: 'matched_skills' },
    { label: 'Semantic Similarity', key: 'semantic_similarity' },
    { label: 'Skill Match', key: 'skill_match_ratio' },
    { label: 'Final Score', key: 'final_score' },
  ];

  // Turn the matched_skills array into a comma-separated string for CSV
  const csvData = filteredResults.map((item) => ({
    name: item.name,
    matched_skills: item.matched_skills.join(', '),
    semantic_similarity: (item.semantic_similarity * 100).toFixed(1) + '%',
    skill_match_ratio: (item.skill_match_ratio * 100).toFixed(1) + '%',
    final_score: item.final_score,
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📊 Screening Results
      </h2>

      {/* Top Bar: Search & CSV Download */}
      <div className="flex justify-end items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search name or skill..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none w-64"
        />

        <CSVLink
          headers={csvHeaders}
          data={csvData}
          filename="Screening_Results.csv"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
        >
          Download CSV
        </CSVLink>
      </div>

      {/* Results Table */}
      {filteredResults.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
          <table className="min-w-full text-sm bg-white divide-y divide-gray-200">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                  Matched Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                  Semantic Similarity
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                  Skill Match
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                  Final Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResults.map((res, idx) => (
                <tr key={idx} className="hover:bg-green-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {res.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {res.matched_skills.join(', ')}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {(res.semantic_similarity * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {(res.skill_match_ratio * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        res.final_score >= 0.6
                          ? 'bg-green-100 text-green-800'
                          : res.final_score >= 0.4
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {res.final_score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">
          No results found. Try adjusting your search.
        </p>
      )}
    </div>
  );
}

export default ResultsPage;