
import { useState, useEffect } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import "./App.css";
// @ts-ignore
import fetchDataFromApi from './api';

export interface Weapon {
    id: string;
    name: string;
    image: string;
    description: string,
    attack: {name: string, amount: number}[],
    defence: {name: string, amount: number}[],
    scalesWith: {name: string, scaling: string}[],
    requiredAttributes: {name: string, amount: number}[],
    category: string,
    weight: number
}

const Weapons: React.FC = () => {
    const [weaponData, setWeaponData] = useState<Weapon[] | null>(null);

    useEffect(() => {
        const fetchWeaponData = async () => {
            try {
                const response = await fetchDataFromApi<Weapon[]>("/weapons?limit=100");
                setWeaponData(response.success ? response.data : null);
            }
            catch (error) {
                console.log("Error fetching Weapon data: ", error);
            }
        }
        fetchWeaponData()
    }, [])
    return (
        <div>
            {weaponData ? (
                weaponData.map((weapon) => (<WeaponCard key={weapon.id} weapon={weapon} />))) 
                : <p>Loading...</p>}
        </div>
    )

}


const WeaponCard: React.FC<{weapon: Weapon}> = ({ weapon }) => (
    <div className="boss-card">
        <Avatar.Root className="avatar-root">
            <Avatar.Image
                className="avatar-image"
                src={weapon.image}
                alt={weapon.description}
            />
            <Avatar.Fallback className="AvatarFallback" delayMs={600}> </Avatar.Fallback>
        </Avatar.Root>
    <div className="boss-info">
      <h2>{weapon.name}</h2>
      <p>{weapon.description}</p>
      <p>Category: {weapon.category}</p>
      <p>Weight: {weapon.weight}</p>

      <div>
        <p>Attack:</p>
        <ul>
          {weapon.attack.map((power, index) => (
            <li key={index}>
              {power.name}: {power.amount}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>Defence:</p>
        <ul>
          {weapon.defence.map((power, index) => (
            <li key={index}>
              {power.name}: {power.amount}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>Scales With:</p>
        <ul>
          {weapon.scalesWith.map((scaling, index) => (
            <li key={index}>
              {scaling.name}: {scaling.scaling}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>Required Attributes:</p>
        <ul>
          {weapon.requiredAttributes.map((attribute, index) => (
            <li key={index}>
              {attribute.name}: {attribute.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
export default Weapons;

