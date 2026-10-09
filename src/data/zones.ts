import { Sun, Sunset, Moon, Sparkles, type LucideIcon } from "lucide-react";

export interface Zone {
  id: string;
  zone: string;
  name: string;
  alias: string;
  from: number;
  to: number;
  rangeLabel: string;
  tagline: string;
  description: string;
  temp: string;
  pressure: string;
  light: string;
  LightIcon: LucideIcon;
  creatures: string[];
  fact: string;
  image: string;
  accent: string;
}

export const zones: Zone[] = [
  {
    id: "sunlight",
    zone: "01",
    name: "Sunlight",
    alias: "Epipelagic",
    from: 0,
    to: 200,
    rangeLabel: "0 – 200 m",
    tagline: "Where the ocean breathes",
    description:
      "Sunlight floods the first two hundred metres, warming the water and fueling photosynthesis. Nearly everything we think of as “the ocean” — coral reefs, kelp forests, the great fisheries — is packed into this thin, bright skin. It is less than 2% of the ocean's volume, yet holds around 90% of its life.",
    temp: "20°C avg",
    pressure: "1 – 21 atm",
    light: "100%",
    LightIcon: Sun,
    creatures: ["Green Sea Turtle", "Bottlenose Dolphin", "Moon Jellyfish", "Coral Polyps", "Bluefin Tuna"],
    fact: "Phytoplankton drifting in this zone produce over half of the oxygen in Earth's atmosphere — roughly one in every two breaths you take.",
    image: "/images/zone-sunlight.jpg",
    accent: "#7dd3fc",
  },
  {
    id: "twilight",
    zone: "02",
    name: "Twilight",
    alias: "Mesopelagic",
    from: 200,
    to: 1000,
    rangeLabel: "200 – 1,000 m",
    tagline: "The last of the light",
    description:
      "Light fades to a faint blue haze, then to nothing. Eyes grow enormous, bellies turn to glass, and the first bioluminescent sparks appear. Every night, billions of animals rise from this zone to feed near the surface — the largest migration of life on Earth, and it happens every single day.",
    temp: "8°C avg",
    pressure: "21 – 101 atm",
    light: "< 1%",
    LightIcon: Sunset,
    creatures: ["Lanternfish", "Giant Squid", "Hatchetfish", "Siphonophore", "Swordfish"],
    fact: "Lanternfish are the most abundant vertebrate on the planet — their nightly vertical migration may be the largest movement of animal life on Earth.",
    image: "/images/zone-twilight.jpg",
    accent: "#38bdf8",
  },
  {
    id: "midnight",
    zone: "03",
    name: "Midnight",
    alias: "Bathypelagic",
    from: 1000,
    to: 4000,
    rangeLabel: "1,000 – 4,000 m",
    tagline: "Sunlight has never reached here",
    description:
      "Total darkness. The only light is made by life itself — lures, flashes and glowing clouds deployed by hunters and hunted alike. Meals are vanishingly rare; the staple food is “marine snow”, the drifting dust of the world above. The water is near freezing, and the pressure is up to four hundred times that at the surface.",
    temp: "4°C avg",
    pressure: "101 – 401 atm",
    light: "0%",
    LightIcon: Moon,
    creatures: ["Anglerfish", "Vampire Squid", "Gulper Eel", "Viperfish", "Giant Tube Worm"],
    fact: "The vampire squid drinks no blood — it grazes on marine snow and can ride out the oxygen minimum zone where few predators can follow.",
    image: "/images/zone-midnight.jpg",
    accent: "#22d3ee",
  },
  {
    id: "abyssal",
    zone: "04",
    name: "Abyssal",
    alias: "Abyssopelagic",
    from: 4000,
    to: 6000,
    rangeLabel: "4,000 – 6,000 m",
    tagline: "The plains that cover half the planet",
    description:
      "The abyssal plains are the single largest habitat on Earth's surface — flat, sediment-covered expanses larger than all the continents combined. Life is sparse, slow and strange: translucent octopuses, fish standing on stilts, fields of glass sponges. Near-freezing water, absolute darkness, and barely a crumb of food.",
    temp: "2°C avg",
    pressure: "401 – 601 atm",
    light: "0%",
    LightIcon: Moon,
    creatures: ["Dumbo Octopus", "Tripod Fish", "Sea Pig", "Glass Sponge", "Basket Star"],
    fact: "Abyssal plains cover more than half of Earth's surface — and we hold better maps of Venus than of our own deep sea floor.",
    image: "/images/zone-abyssal.jpg",
    accent: "#2dd4bf",
  },
  {
    id: "hadal",
    zone: "05",
    name: "Hadal",
    alias: "Hadalpelagic",
    from: 6000,
    to: 10935,
    rangeLabel: "6,000 – 10,935 m",
    tagline: "Named after Hades, realm of the dead",
    description:
      "The hadal zone exists only in the great trenches, where one tectonic plate dives beneath another. At the bottom of the Mariana Trench the pressure exceeds a tonne per square centimetre — the weight of a small car pressing on your thumbnail. Yet even here life persists: pale snailfish, scavenging amphipods, and single-celled giants in the mud.",
    temp: "1 – 2°C",
    pressure: "601 – 1,094 atm",
    light: "0%",
    LightIcon: Sparkles,
    creatures: ["Mariana Snailfish", "Amphipods", "Xenophyophores", "Supergiant Isopod"],
    fact: "The Mariana snailfish thrives at 8,000 metres — the deepest fish ever filmed. Below roughly 8,400 m, biochemistry appears to forbid fish entirely.",
    image: "/images/zone-hadal.jpg",
    accent: "#c084fc",
  },
];

export const DEEPEST = 10935;

export const timeline = [
  {
    year: "1872",
    title: "HMS Challenger",
    text: "The first great deep-sea survey dredges living creatures from depths science had declared lifeless.",
  },
  {
    year: "1930",
    title: "The Bathysphere",
    text: "William Beebe descends 435 m in a steel sphere and describes, live by radio, fish that glow in the dark.",
  },
  {
    year: "1960",
    title: "Trieste",
    text: "Jacques Piccard and Don Walsh reach 10,916 m — the deepest human descent for the next 52 years.",
  },
  {
    year: "2012",
    title: "Deepsea Challenger",
    text: "James Cameron returns to the bottom of the Challenger Deep — alone, in a vertical torpedo of a submarine.",
  },
  {
    year: "2019",
    title: "Five Deeps",
    text: "Victor Vescovo dives to the deepest point of all five oceans — and finds a plastic bag at the bottom.",
  },
];
