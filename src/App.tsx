import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import ShowEldenElements from './ShowEldenElements'
import LandingPage from './LandingPage'


interface Page {
  href: string;
  text: string;
}

// the pages array is passed into navbar and into routes for ShowEldenElements to consume
const pages: Page[] = [
  { href: "/ammos", text: "Ammo" },
  { href: "/armors", text: "Armors" },
  { href: "/ashes", text: "Ashes of War" },
  { href: "/bosses", text: "Bosses" },
  { href: "/classes", text: "Classes" },
  { href: "/creatures", text: "Creatures" },
  { href: "/incantations", text: "Incantations" },
  { href: "/items", text: "Items" },
  { href: "/locations", text: "Locations" },
  { href: "/npcs", text: "NPCs" },
  { href: "/shields", text: "Shields" },
  { href: "/sorceries", text: "Sorceries" },
  { href: "/spirits", text: "Spirits" },
  { href: "/talismans", text: "Talismans" },
  { href: "/weapons", text: "Weapons" },
];


function App() {
  return (
      <Theme accentColor="mint">
          <Router>
        <Navbar pages={pages}/>
{/*          <React.Suspense fallback={<Loading />}>*/}
            <Routes>
             <Route path="/" element={<LandingPage/>}/>
             {pages.map((page, index) => (
              <Route key={index} path={page.href} element={<ShowEldenElements />} />
             ))}
            </Routes>
{/*           </React.Suspense>*/}
          </Router>
      </Theme>
  );
}

export default App;
