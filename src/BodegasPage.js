import React, { useEffect, useState } from 'react';
import './styles.css';  // Import the CSS file
import MapView from './MapView';  // Import the MapView component
import bodegasData from './bodegas.json';  // Import the JSON file

const BodegasPage = ({ language }) => {
  const [bodegas, setBodegas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(true);  // Default to map view
  const [filters, setFilters] = useState({
    district: [],
    smoking: [],
    outdoorSeating: [],
    tapBeer: [],
    pool: [],
    kicker: [],
    cheapestBeer: { min: 0, max: 80 }
  });
  const limit = 5;

  useEffect(() => {
    fetchBodegas();
  }, [page, filters, showMap]);

  const fetchBodegas = () => {
    const formattedFilters = {
      ...filters,
      district: filters.district.join(','),
      smoking: filters.smoking.join(','),
      outdoorSeating: filters.outdoorSeating.join(','),
      tapBeer: filters.tapBeer.join(','),
      pool: filters.pool.join(','),
      kicker: filters.kicker.join(','),
      cheapestBeer: filters.cheapestBeer.max
    };

    console.log("Fetching with formatted filters:", formattedFilters);

    let filteredBodegas = bodegasData.Bodegas.filter(bodega => {
      return (
        (formattedFilters.district === '' || formattedFilters.district.includes(bodega.District)) &&
        (formattedFilters.smoking === '' || formattedFilters.smoking.includes(bodega.Smoking)) &&
        (formattedFilters.outdoorSeating === '' || formattedFilters.outdoorSeating.includes(bodega.OutdoorSeating)) &&
        (formattedFilters.tapBeer === '' || formattedFilters.tapBeer.includes(bodega.TapBeer)) &&
        (formattedFilters.pool === '' || formattedFilters.pool.includes(bodega.Pool)) &&
        (formattedFilters.kicker === '' || formattedFilters.kicker.includes(bodega.Kicker)) &&
        (bodega.CheapestBeer <= formattedFilters.cheapestBeer)
      );
    });

    const offset = (page - 1) * limit;
    const paginatedBodegas = showMap ? filteredBodegas : filteredBodegas.slice(offset, offset + limit);
    setBodegas(paginatedBodegas);
    setTotalPages(Math.ceil(filteredBodegas.length / limit));
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      console.log(newFilters);
      return newFilters;
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleMap = () => {
    setShowMap(!showMap);  // Toggle the map view
    setPage(1);  // Reset to the first page when toggling views
  };

  const applyFilters = () => {
    setShowFilters(false);
    setPage(1);  // Reset to the first page when applying filters
  };

  const removeFilters = () => {
    setFilters({
      district: [],
      smoking: [],
      outdoorSeating: [],
      tapBeer: [],
      pool: [],
      kicker: [],
      cheapestBeer: { min: 0, max: 80 }
    });
    setShowFilters(false);
    setPage(1);  // Reset to the first page when removing filters
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-4 bodega-list-boundary">
      <h1 className="text-2xl font-bold mb-4">{language === 'Danish' ? 'Bodegas' : 'Bars'}</h1>
      <div className="flex justify-between w-full mb-4">
        <button onClick={toggleFilters}>Filter</button>
        <div className="right-align">
          <button onClick={toggleMap} className="mr-4">{showMap ? (language === 'Danish' ? 'Vis liste' : 'Show List') : (language === 'Danish' ? 'Vis kort' : 'Show Map')}</button>
        </div>
      </div>
      {showFilters && (
        <div className="filter-overlay">
          <div className="filter-container">
            <div className="filter-section">
              <label className="filter-label">{language === 'Danish' ? 'Distrikt' : 'District'}:</label>
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    value="Amager"
                    checked={filters.district.includes('Amager')}
                    onChange={e => handleFilterChange('district', e.target.checked ? [...filters.district, e.target.value] : filters.district.filter(val => val !== e.target.value))}
                  />
                  Amager
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="District 2"
                    checked={filters.district.includes('District 2')}
                    onChange={e => handleFilterChange('district', e.target.checked ? [...filters.district, e.target.value] : filters.district.filter(val => val !== e.target.value))}
                  />
                  District 2
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="District 3"
                    checked={filters.district.includes('District 3')}
                    onChange={e => handleFilterChange('district', e.target.checked ? [...filters.district, e.target.value] : filters.district.filter(val => val !== e.target.value))}
                  />
                  District 3
                </label>
              </div>
            </div>
            <div className="filter-section">
              <label className="filter-label">{language === 'Danish' ? 'Rygning' : 'Smoking'}:</label>
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={filters.smoking.includes('Yes')}
                    onChange={e => handleFilterChange('smoking', e.target.checked ? [...filters.smoking, e.target.value] : filters.smoking.filter(val => val !== e.target.value))}
                  />
                  Yes
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={filters.smoking.includes('No')}
                    onChange={e => handleFilterChange('smoking', e.target.checked ? [...filters.smoking, e.target.value] : filters.smoking.filter(val => val !== e.target.value))}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="filter-section">
              <label className="filter-label">{language === 'Danish' ? 'Udendørs siddepladser' : 'Outdoor Seating'}:</label>
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={filters.outdoorSeating.includes('Yes')}
                    onChange={e => handleFilterChange('outdoorSeating', e.target.checked ? [...filters.outdoorSeating, e.target.value] : filters.outdoorSeating.filter(val => val !== e.target.value))}
                  />
                  Yes
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={filters.outdoorSeating.includes('No')}
                    onChange={e => handleFilterChange('outdoorSeating', e.target.checked ? [...filters.outdoorSeating, e.target.value] : filters.outdoorSeating.filter(val => val !== e.target.value))}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="filter-section">
              <label className="filter-label">{language === 'Danish' ? 'Øl på hanen' : 'Tap Beer'}:</label>
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={filters.tapBeer.includes('Yes')}
                    onChange={e => handleFilterChange('tapBeer', e.target.checked ? [...filters.tapBeer, e.target.value] : filters.tapBeer.filter(val => val !== e.target.value))}
                  />
                  Yes
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={filters.tapBeer.includes('No')}
                    onChange={e => handleFilterChange('tapBeer', e.target.checked ? [...filters.tapBeer, e.target.value] : filters.tapBeer.filter(val => val !== e.target.value))}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="filter-section">
              <label className="filter-label">{language === 'Danish' ? 'Pool' : 'Pool'}:</label>
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    value="Pool"
                    checked={filters.pool.includes('Pool')}
                    onChange={e => handleFilterChange('pool', e.target.checked ? [...filters.pool, e.target.value] : filters.pool.filter(val => val !== e.target.value))}
                  />
                  Pool
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="Skomager"
                    checked={filters.pool.includes('Skomager')}
                    onChange={e => handleFilterChange('pool', e.target.checked ? [...filters.pool, e.target.value] : filters.pool.filter(val => val !== e.target.value))}
                  />
                  Skomager
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={filters.pool.includes('No')}
                    onChange={e => handleFilterChange('pool', e.target.checked ? [...filters.pool, e.target.value] : filters.pool.filter(val => val !== e.target.value))}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="filter-section">
              <label className="filter-label">{language === 'Danish' ? 'Kicker' : 'Kicker'}:</label>
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={filters.kicker.includes('Yes')}
                    onChange={e => handleFilterChange('kicker', e.target.checked ? [...filters.kicker, e.target.value] : filters.kicker.filter(val => val !== e.target.value))}
                  />
                  Yes
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={filters.kicker.includes('No')}
                    onChange={e => handleFilterChange('kicker', e.target.checked ? [...filters.kicker, e.target.value] : filters.kicker.filter(val => val !== e.target.value))}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="filter-section">
              <label className="filter-label">{language === 'Danish' ? 'Billigste øl [DKK]' : 'Cheapest Beer [DKK]'}:</label>
              <input type="range" min="0" max="80" value={filters.cheapestBeer.max} onChange={e => handleFilterChange('cheapestBeer', { ...filters.cheapestBeer, max: e.target.value })} />
              <span>{filters.cheapestBeer.max}</span>
            </div>
            <div className="filter-buttons">
              <button className="apply-filters" onClick={applyFilters}>{language === 'Danish' ? 'Anvend filtre' : 'Apply Filters'}</button>
              <button className="remove-filters" onClick={removeFilters}>{language === 'Danish' ? 'Fjern filtre' : 'Remove Filters'}</button>
            </div>
          </div>
        </div>
      )}
      {showMap ? (
        <MapView bodegas={bodegas} filters={filters} showMap={showMap} page={page} />
      ) : (
        <ul className="bodega-list">
          {bodegas.map((bodega) => (
            <li key={bodega.id} className="bodega-item general-text">
              <h2 className="text-xl font-bold">{bodega.Name}</h2>
              <p>Address: {bodega.Address}</p>
              <p>District: {bodega.District}</p>
              <p>Smoking: {bodega.Smoking}</p>
              <p>Outdoor Seating: {bodega.OutdoorSeating}</p>
              <p>Tap Beer: {bodega.TapBeer}</p>
              <p>Pool: {bodega.Pool}</p>
              <p>Kicker: {bodega.Kicker}</p>
              <p>Cheapest Beer: {bodega.CheapestBeer}</p>
              <p>Special: {bodega.Special}</p>
              <p>Description: {bodega.Description}</p>
              <p>Date: {bodega.Date}</p>
              <p>Notes: {bodega.Notes}</p>
            </li>
          ))}
        </ul>
      )}
      {!showMap && (
        <div className="flex justify-between w-full mt-4 general-text">
          {page > 1 && (
            <button onClick={handlePrevPage}>Previous</button>
          )}
          {page < totalPages && (
            <div className="right-align">
              <button onClick={handleNextPage}>Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BodegasPage;
