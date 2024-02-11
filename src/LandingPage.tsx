import { useState, useEffect } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import "./App.css";
// @ts-ignore
import fetchDataFromApi from './api';

export interface Ammo {
    id: string;
    name: string;
    image: string;
    description: string,
    type: string,
    passive: string,
    attackPower: {name: string, amount: number}[];
}

const Ammos: React.FC = () => {
    const [ammoData, setAmmoData] = useState<Ammo[] | null>(null);

    useEffect(() => {
        const fetchAmmoData = async () => {
            try {
                const response = await fetchDataFromApi<Ammo[]>("/ammos?limit=100");
                setAmmoData(response.success ? response.data : null);
            }
            catch (error) {
                console.log("Error fetching Ammo data: ", error);
            }
        }
        fetchAmmoData()
    }, [])
    return (
        <div>
            {ammoData ? (
                ammoData.map((ammo) => (<AmmoCard key={ammo.id} ammo={ammo} />))) 
                : <p>Loading...</p>}
        </div>
    )

}


const AmmoCard: React.FC<{ammo: Ammo}> = ({ ammo }) => (
    <div className="card-main">
        <Avatar.Root className="avatar-root">
            <Avatar.Image
                className="avatar-image"
                src={ammo.image}
                alt={ammo.description}
            />
            <Avatar.Fallback className="AvatarFallback" delayMs={600}> </Avatar.Fallback>
        </Avatar.Root>
        <div className="card-info">
            <h2>{ammo.name}</h2>
            <p>{ammo.description}</p>
            <p>Passive: {ammo.passive}</p>
            <p>Type: {ammo.type}</p>
            <div>
                <p>Attack Power:</p>
                <ul>
                    {ammo.attackPower.map((power, index) => (
                        <li key={index}>
                        {power.name}: {power.amount}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

export default Ammos;

