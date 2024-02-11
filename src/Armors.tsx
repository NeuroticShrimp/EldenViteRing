import { useState, useEffect } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import "./App.css";
// @ts-ignore
import fetchDataFromApi from './api';

export interface armor {
    id: string;
    name: string;
    image: string;
    description: string,
    category: string,
    weight: number,
    dmgNegation: { name: string, amount: number},
    resistance: { name:string, amount: number}
}


const armors: React.FC = () => {
    const [armorData, setArmorData] = useState<armor[] | null>(null);

    useEffect(() => {
        const fetchArmorData = async () => {
            try {
                const response = await fetchDataFromApi<armor[]>("/armors");
                setArmorData(response.success ? response.data : null);
            }
            catch (error) {
                console.log("Error fetching armor data: ", error);
            }
        }
        fetchArmorData()
    }, [])
    return (
        <div>
            {armorData ? (
                armorData.map((armor) => (<ArmorCard key={armor.id} armor={armor} />))) 
                : <p>Loading...</p>}
        </div>
    )

}


const ArmorCard: React.FC<{armor: armor}> = ({ armor }) => (
    <div className="boss-card">
        <Avatar.Root className="avatar-root">
            <Avatar.Image
                className="avatar-image"
                src={armor.image}
                alt={armor.description}
            />
            <Avatar.Fallback className="AvatarFallback" delayMs={600}> </Avatar.Fallback>
        </Avatar.Root>
        <div className="armor-info">
            <h2>{armor.name}</h2>
            <p>Description: {armor.description}</p>
            <p>Category: {armor.category}</p>
            <p>Weight: {armor.weight}</p>
        </div>
            <div>
                <p>Damage Negation:</p>
                <ul>
                    {armor.dmgNegation.map((negation, index) => (
                        <li key={index}>
                        {negation.name}: {negation.amount}
                        </li>
                    ))}
                </ul>
            </div>
                <div>
                <p>Attack Power:</p>
                <ul>
                    {armor.resistance.map((resistance, index) => (
                        <li key={index}>
                        {resistance.name}: {resistance.amount}
                        </li>
                    ))}
                </ul>
            </div>
    </div>
);

export default armors;

