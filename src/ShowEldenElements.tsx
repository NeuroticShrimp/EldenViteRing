// This is a higher order function that makes an api call based on the path in useLocation and then generates cards for the given path

import { useState, useEffect } from 'react';
import "./App.css";
import fetchDataFromApi from './api';
import { useLocation } from "react-router-dom";

const DataCard: React.FC = () => {
const location = useLocation();
    const [Data, setData] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDataFromApi<any>(location.pathname);
                setData(response.success ? response.data : null);
            }
            catch (error) {
                console.log("Error fetching Ammo data: ", error);
            }
        }
        fetchData()
    }, [location.pathname])
    return (
        <div>
            {Data ? (
                Data.map((data) => (<Card key={data.id} data={data} />))) 
                : <p>Loading...</p>}
        </div>
    )

}

const Card: React.FC<{ data: any }> = ({ data }) => {
  // Renders details for objects, arrays, and strings
  const renderDetails = (item: any) => {
    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      return (
        <div className="card-info-group">
          {Object.entries(item).map(([propKey, propValue]) => (
            <p key={propKey}>{`${propKey}: ${propValue}`}</p>
          ))}
        </div>
      );
    } else if (Array.isArray(item)) {
      return item.map((arrayItem, index) => (
        <p key={index}>{typeof arrayItem === 'object' ? renderDetails(arrayItem) : arrayItem}</p>
      ));
    }
    // For simple string or number
    return <p>{item}</p>;
  };

  // Renders strings, objects containing arrays, or nested objects from data
  const renderDataDetails = () => {
    return Object.entries(data).map(([key, value]) => {
      // Skip image and description since they're handled separately
      if (key === 'image' || key === 'description' || key === 'id') return null;

      return (
        <div key={key} className="card-info-group">
          <h2>{key}</h2>
          {renderDetails(value)}
        </div>
      );
    });
  };

  return (
    <div className="card-main">
      {/* Image and description always present */}
      <div className="avatar-image">
        <img src={data.image} alt={data.name} />
      </div>
      {/* Render remaining details */}
      <div className="card-info">
        {renderDataDetails()}
      </div>
    </div>
  );
};
export default DataCard;
