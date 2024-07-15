import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bodegasData from './bodegas.json'; // Import the JSON file

const HomePage = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      const filteredSuggestions = bodegasData.Bodegas.filter(bodega =>
        bodega.Name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 10)); // Limit to 10 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (bodegaId) => {
    navigate(`/bodegas/${bodegaId}`);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <img src="/DBS_Logo.png" alt="Logo" className="w-3/4 mt-4" />
      <div className="w-full flex justify-center mt-4 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={language === 'Danish' ? 'Søg' : 'Search'}
          className="w-3/4 p-2 rounded-full border border-gray-400"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-1 w-3/4 bg-white border border-gray-400 rounded shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.id)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion.Name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full flex flex-col items-center mt-4">
        <ArticlePreview
          title={language === 'Danish' ? 'Hvad er De Brune Sider?' : 'What is De Brune Sider?'}
          intro={language === 'Danish' ? 'Dette er introduktionen til De Brune Sider.' : 'This is the introduction to De Brune Sider.'}
        />
      </div>
    </div>
  );
};

const ArticlePreview = ({ title, intro }) => (
  <div className="w-3/4 bg-white p-4 m-2 rounded-lg shadow-md component-box">
    <h2 className="text-xl font-bold">{title}</h2>
    <p>{intro}</p>
    <a href="#read-more" className="text-blue-500">{title}</a>
  </div>
);

export default HomePage;
