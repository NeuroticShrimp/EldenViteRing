import { useState, useEffect } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import "./App.css";
// @ts-ignore
import fetchDataFromApi from './api';
import { useLocation } from "react-router-dom";

export interface Ammo {
    id: string;
    name: string;
    image: string;
    description: string,
    type: string,
    passive: string,
    attackPower: {name: string, amount: number}[];
}

const apiDataKey = useLocation();
const Data: React.FC = () => {
    const [Data, setData] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDataFromApi<Ammo[]>(apiDataKey);
                setData(response.success ? response.data : null);
            }
            catch (error) {
                console.log("Error fetching Ammo data: ", error);
            }
        }
        fetchData()
    }, [])
    return (
        <div>
            {Data ? (
                Data.map((data) => (<Card key={data.id} ammo={data} />))) 
                : <p>Loading...</p>}
        </div>
    )

}

const Card: React.FC<{ ammo: any }> = ({ ammo }) => {
  // Renders strings or objects containing arrays from ammo
  const renderAmmoDetails = () => {
    return Object.entries(ammo).map(([key, value]) => {
      // Skip image and description since they're handled separately
      if (key === 'image' || key === 'description' || key === 'id') return null;

      // If the value is a string, display the key and value
      if (typeof value === 'string') {
        return <p key={key}>{`${key}: ${value}`}</p>;
      }

      // If the value is an object of arrays, map over its elements
      if (typeof value === 'object') {
        return value.map((item, index) => (
          <div key={`${key}-${index}`}>
            <h2>{item[0]}</h2>
            <p>{item[1]}</p>
          </div>
        ));
      }
    });
  };

  return (
    <div className="card-main">
      {/* Image and description always present */}
      <div className="avatar-image">
        <img src={ammo.image} alt={ammo.description} />
      </div>
      {/* Render remaining details */}
      <div className="card-info">
        {renderAmmoDetails()}
      </div>
    </div>
  );
};
export default Data;

