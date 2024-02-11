// dataTransformUtils.ts
interface Ammo {
    id: string;
    name: string;
    image: string;
    description: string,
    type: string,
    passive: string,
    attackPower: {name: string, amount: number}[];
}

function mutateAmmo(ammo: Ammo): Ammo {
  const { type: oldValue, ...rest } = ammo;
  return { ...rest, ["Ammo Name]: oldValue };
}

interface Armor {
    id: string;
    name: string;
    image: string;
    description: string,
    category: string,
    weight: number,
    dmgNegation: {name: string, amount: number}[],
    resistance: {name: string, amount: number}[],
}



interface AshOfWar {
    id: string;
    name: string;
    image: string;
    description: string,
    affinity: string,
    skill: string,
}

interface Boss {
    id: string;
    name: string;
    image: string;
    description: string,
    location: string,
    region: string,
    drops: string[],
    healthPoints: string;
}

interface HeroClass {
    id: string;
    name: string;
    image: string;
    description: string,
    stats: { level: string, vigor: string, mind: string, endurance: string, strength: string, dexterity: string, intelligence: string, faith: string, arcane: string;}
}

interface Creature {
    id: string;
    name: string;
    image: string;
    description: string,
    location: string,
    drops: string[],
}

interface Incantation {
    id: string;
    name: string;
    image: string;
    description: string,
    type: string,
    cost: string,
    slots: number,
    effects: string,
    requires: { name: string, amount: number }[]
}

interface Item {
    id: string;
    name: string;
    image: string;
    description: string,
    type: string,
    effect: string,
}

interface Location {
    id: string;
    name: string;
    image: string;
    description: string,
}

interface NPC {
    id: string;
    name: string;
    image: string;
    description: string,
    location: string,
    quote: string,
}

interface Shield {
    id: string;
    name: string;
    image: string;
    description: string,
    category: string,
    weight: number,
    attack: { name: string, amount: number }[],
    defence: {name: string, amount: number }[],
    requiredAttributes: { name: string, amount: number }[],
    scalesWith: { name: string, scaling: string }[]
}

interface Sorcery {
    id: string;
    name: string;
    image: string;
    description: string,
    type: string,
    cost: number,
    slots: number,
    effects: string;
    requires: { name: string, amount: number }[]
}

interface Spirit {
    id: string;
    name: string;
    image: string;
    description: string,
    fpCost: number,
    hpCost: number,
    effects: string;
}

interface Talisman {
    id: string;
    name: string;
    image: string;
    description: string,
    location: string,
    region: string,
    drops: string[],
    healthPoints: string;
}

interface Weapon {
    id: string;
    name: string;
    image: string;
    description: string,
    category: string,
    weight: number,
    attack: { name: string, amount: number }[],
    defence: { name: string, amount: number }[],
    requiredAttributes: {name: string, amount: number }[],
    scalesWith: {name: string, scaling: string }[]
}

// A generic function to transform any entity data
export function transformEntityData<T>(entity: T): Record<string, any> {
  const transformedEntity: Record<string, any> = {};

  Object.entries(entity).forEach(([key, value]) => {
    let newValue = value;

    // Custom transformation logic could go here, e.g., combining fields or renaming
    // For demonstration, let's just capitalize the key names
    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

    // Handle specific structures, like arrays of objects (e.g., attackPower in Ammo)
    if (Array.isArray(value)) {
      newValue = value.map(item => {
        if (typeof item === 'object' && item !== null) {
          return transformEntityData(item); // Recursively transform nested objects
        }
        return item;
      });
    } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
      // Recursively transform nested objects, excluding Date objects
      newValue = transformEntityData(value);
    }

    transformedEntity[formattedKey] = newValue;
  });

  return transformedEntity;
}

// Example usage with an Ammo object
const ammo: Ammo = {
  id: "some-id",
  name: "Elden Arrow",
  image: "https://example.com/elden-arrow.png",
  description: "An arrow used by the ancient Elden warriors.",
  type: "Arrow",
  passive: "None",
  attackPower: [{ name: "Physical", amount: 100 }],
};

const transformedAmmo = transformEntityData<Ammo>(ammo);
console.log(transformedAmmo);

// You would use transformEntityData for other entities in a similar fashion.
