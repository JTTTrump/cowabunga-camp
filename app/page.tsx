"use client";

import { useState } from "react";
import { mapViewBox, statesFillPath, bordersPath, nationPath, locationPoints } from "./map-data";

type Experience = {
  id: string;
  eyebrow: string;
  name: string;
  summary: string;
  duration: string;
  privacy: string;
  capacity: string;
  price: number;
  unit: string;
  includes: string[];
  bestFor: string;
  accent: string;
};

type Location = {
  id: string;
  city: string;
  state: string;
  near: string;
  drive: string;
  x: number;
  y: number;
  animals: string[];
  experienceIds: string[];
  note: string;
};

const experiences: Experience[] = [
  {
    id: "lounge",
    eyebrow: "A quick taste",
    name: "Shaggy Cow Lounge",
    summary: "One joyful hour of feeding, petting and photos with the fluffiest members of the farm.",
    duration: "60 minutes",
    privacy: "Shared session",
    capacity: "Up to 30 guests",
    price: 29.5,
    unit: "per guest",
    includes: ["Farm entry", "Starter feed cup", "Style & selfie station", "Animal introductions"],
    bestFor: "First visits, young families and an easy afternoon out",
    accent: "coral",
  },
  {
    id: "cabana",
    eyebrow: "Make a day of it",
    name: "Private Cowabunga Cabana",
    summary: "Your own pasture-side home base, with six hours to settle in and enjoy the farm at your pace.",
    duration: "6 hours",
    privacy: "Private cabana",
    capacity: "Up to 12 guests",
    price: 300,
    unit: "per group",
    includes: ["Private furnished cabana", "Behind-the-barn tour", "Large feed & grooming kit", "Games, music, cooler & ice"],
    bestFor: "Birthdays, friend groups and relaxed family days",
    accent: "gold",
  },
  {
    id: "moonlight",
    eyebrow: "Stay past sunset",
    name: "Moonlight Cabana",
    summary: "A glowing private evening with firelight, games and shaggy companions beneath the stars.",
    duration: "4 hours",
    privacy: "Private evening",
    capacity: "Up to 12 guests",
    price: 450,
    unit: "per group",
    includes: ["Styled private cabana", "Fire pit & unlimited wood", "Dedicated farm hand", "Games, lights & cooler"],
    bestFor: "Date nights, celebrations and milestone gatherings",
    accent: "violet",
  },
  {
    id: "glamping",
    eyebrow: "Sleep with the herd",
    name: "Cowabunga Glamping",
    summary: "An overnight farm escape in a yurt or cabin surrounded by free-roaming fluffy friends.",
    duration: "Overnight",
    privacy: "Private stay",
    capacity: "Up to 6 guests",
    price: 265,
    unit: "typical night",
    includes: ["Private yurt or cabin", "Farm access", "Animal encounters", "Destination-style stay"],
    bestFor: "Weekend escapes, couples and destination travelers",
    accent: "green",
  },
];

const locations: Location[] = [
  { id: "everson", city: "Everson", state: "WA", near: "Bellingham", drive: "27 min", x: 12, y: 17, animals: ["Highland cows", "Sheep", "Goats"], experienceIds: ["lounge", "cabana", "glamping"], note: "Mountain views and an overnight cabin option." },
  { id: "priest", city: "Priest River", state: "ID", near: "Coeur d’Alene", drive: "55 min", x: 24, y: 21, animals: ["Highland cows", "Pigs", "Ponies"], experienceIds: ["lounge", "cabana", "moonlight", "glamping"], note: "One of the widest experience selections in the network." },
  { id: "durham", city: "Durham", state: "CA", near: "Sacramento", drive: "1 hr", x: 8, y: 43, animals: ["Highland cows", "Farm friends"], experienceIds: ["lounge", "glamping"], note: "A relaxed Northern California farm escape." },
  { id: "pine", city: "Pine", state: "AZ", near: "Phoenix", drive: "100 mi", x: 26, y: 65, animals: ["Highland cows", "Sheep"], experienceIds: ["lounge", "glamping"], note: "High-country scenery with two overnight yurt choices." },
  { id: "lyons", city: "Lyons", state: "CO", near: "Boulder", drive: "40 min", x: 40, y: 45, animals: ["Highland cows", "Goats", "Sheep"], experienceIds: ["lounge", "cabana", "moonlight"], note: "Mountain atmosphere with select hot-tub cabanas." },
  { id: "wellsville", city: "Wellsville", state: "UT", near: "Salt Lake City", drive: "1 hr", x: 31, y: 43, animals: ["Highland cows", "Baby calves"], experienceIds: ["lounge", "moonlight"], note: "Select baby-calf bottle feeding is available." },
  { id: "bridgeport", city: "Bridgeport", state: "TX", near: "Fort Worth", drive: "1 hr", x: 49, y: 69, animals: ["Highland cows", "Goats"], experienceIds: ["lounge"], note: "A simple, focused Lounge experience near DFW." },
  { id: "paola", city: "Paola", state: "KS", near: "Kansas City", drive: "1 hr", x: 53, y: 51, animals: ["Highland cows", "Baby calves", "Sheep"], experienceIds: ["lounge", "cabana", "moonlight"], note: "Private groups, evenings and bottle feeding on select dates." },
  { id: "cookeville", city: "Cookeville", state: "TN", near: "Nashville", drive: "1 hr", x: 67, y: 59, animals: ["Highland cows", "Goats", "Pigs"], experienceIds: ["lounge"], note: "A colorful one-hour escape from Nashville." },
  { id: "statesville", city: "Statesville", state: "NC", near: "Charlotte", drive: "45 min", x: 78, y: 57, animals: ["Highland cows", "Baby calves", "Sheep"], experienceIds: ["lounge", "cabana", "moonlight"], note: "A full menu of private, daytime and evening experiences." },
  { id: "defuniak", city: "DeFuniak Springs", state: "FL", near: "Destin", drive: "50 min", x: 69, y: 75, animals: ["Highland cows", "Sheep", "Pigs"], experienceIds: ["lounge", "cabana", "glamping"], note: "Glamping and private cabanas near the Emerald Coast." },
  { id: "newport", city: "New Port Richey", state: "FL", near: "Tampa", drive: "45 min", x: 80, y: 82, animals: ["Highland cows", "Baby calves", "Goats"], experienceIds: ["lounge", "cabana"], note: "Bottle feeding and splash upgrades on select dates." },
  { id: "middleburg", city: "Middleburg", state: "FL", near: "Jacksonville", drive: "45 min", x: 83, y: 72, animals: ["Highland cows", "Baby calves", "Farm friends"], experienceIds: ["lounge", "cabana", "moonlight"], note: "A versatile location for both daytime and twilight visits." },
];

const addOns = [
  { id: "classic", name: "Feed more", brand: "Classic Feed Bucket", description: "A generous bucket of animal cookies and grain for 2–5 guests.", price: 47, for: ["lounge", "glamping"] },
  { id: "style", name: "Feed, brush & style", brand: "Udderly Stylish Bucket", description: "Premium feed plus brushes and colorful bows for a hands-on makeover.", price: 63, for: ["lounge", "glamping"] },
  { id: "memory", name: "Capture every moo-ment", brand: "Moo-Ment Maker", description: "Feed, styling, flower crowns, a Polaroid camera, 20 photos and a keepsake album.", price: 156, for: ["lounge", "cabana", "moonlight", "glamping"] },
  { id: "bottle", name: "Bottle-feed a baby moo", brand: "Baby Moo Experience", description: "A rare calf-feeding experience with matching flower crowns and Polaroid keepsakes.", price: 125, for: ["lounge", "cabana"] },
  { id: "movie", name: "Watch beneath the stars", brand: "Moo-vies Under the Stars", description: "A private outdoor cinema with projector, popcorn and movie candy.", price: 95, for: ["moonlight", "glamping"] },
  { id: "lagoon", name: "Add a private splash zone", brand: "Moo Lagoon", description: "Family pool, water blasters, floating snack tray, toys and popsicles.", price: 85, for: ["cabana"] },
];

const filters = [
  ["all", "All farms"], ["lounge", "1-hour visits"], ["cabana", "Private cabanas"], ["moonlight", "Evenings"], ["glamping", "Overnight"],
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [locationId, setLocationId] = useState("statesville");
  const [experienceId, setExperienceId] = useState("cabana");
  const [guests, setGuests] = useState(6);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["memory"]);

  const visibleLocations = locations.filter((location) => filter === "all" || location.experienceIds.includes(filter));
  const location = locations.find((item) => item.id === locationId) ?? locations[0];
  const availableExperiences = experiences.filter((item) => location.experienceIds.includes(item.id));
  const experience = availableExperiences.find((item) => item.id === experienceId) ?? availableExperiences[0];
  const compatibleAddOns = addOns.filter((item) => item.for.includes(experience.id));
  const addOnTotal = compatibleAddOns.filter((item) => selectedAddOns.includes(item.id)).reduce((sum, item) => sum + item.price, 0);
  const baseTotal = experience.unit === "per guest" ? experience.price * guests : experience.price;
  const total = baseTotal + addOnTotal;
  const perPerson = total / guests;

  const selectLocation = (id: string) => {
    const next = locations.find((item) => item.id === id)!;
    setLocationId(id);
    if (!next.experienceIds.includes(experienceId)) setExperienceId(next.experienceIds[0]);
    setSelectedAddOns([]);
    document.getElementById("location-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseExperience = (id: string) => {
    setExperienceId(id);
    setSelectedAddOns([]);
  };

  const toggleAddOn = (id: string) => setSelectedAddOns((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Cowabunga Camp home"><span className="brand-mark">C</span><span>COWABUNGA<small>CAMP</small></span></a>
        <nav aria-label="Primary navigation"><a href="#finder">Locations</a><a href="#compare">Experiences</a><a href="#builder">Plan your visit</a></nav>
        <a className="nav-cta" href="#finder">Find your farm <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker"><span>●</span> 13 farms · endless ways to graze</p>
          <h1>Find your<br /><em>happy place.</em></h1>
          <p className="hero-lead">From a one-hour cuddle to a private night under the stars, discover the Cowabunga experience that fits your herd.</p>
          <a className="primary-button" href="#finder">Explore the map <span>↓</span></a>
          <div className="social-proof"><div className="avatar-stack"><i>🐮</i><i>🐑</i><i>🐐</i></div><div><strong>4.9 <span>★★★★★</span></strong><small>Loved by thousands of happy grazers</small></div></div>
        </div>
        <div className="hero-media media-slot">
          <div className="media-label"><span>▶</span> HERO FILM · 15 SEC</div>
          <div className="hero-orbit one">Feed</div><div className="hero-orbit two">Stay</div><div className="hero-orbit three">Cuddle</div>
          <div className="cow-silhouette">🐮</div>
          <p>Golden-hour Highland cow film<br /><small>slow motion · human connection · wide pasture</small></p>
        </div>
      </section>

      <section className="finder section" id="finder">
        <div className="section-heading split-heading"><div><p className="kicker dark"><span>●</span> Start close to home</p><h2>Find your farm.</h2></div><p>Every Cowabunga farm has its own personality, animals and adventures. Choose a pin to see exactly what’s waiting there.</p></div>
        <div className="filter-row" role="group" aria-label="Filter locations">
          {filters.map(([id, label]) => <button key={id} className={filter === id ? "active" : ""} onClick={() => setFilter(id)}>{label}</button>)}
        </div>
        <div className="map-layout">
          <div className="map-card" aria-label="Interactive map of Cowabunga locations">
            <svg className="usa-map" viewBox={mapViewBox} role="img" aria-label="Map of the United States showing Cowabunga farm locations and their distance from major cities">
              <path className="map-land" d={statesFillPath} />
              <path className="map-borders" d={bordersPath} />
              <path className="map-outline" d={nationPath} />
              {visibleLocations.map((item) => {
                const pt = locationPoints[item.id];
                if (!pt) return null;
                const active = item.id === locationId;
                return (
                  <g key={`link-${item.id}`} className={`map-link ${active ? "active" : ""}`}>
                    <line x1={pt.cx} y1={pt.cy} x2={pt.fx} y2={pt.fy} />
                    <circle className="city-dot" cx={pt.cx} cy={pt.cy} r={active ? 5 : 3.5} />
                  </g>
                );
              })}
              {visibleLocations.map((item) => {
                const pt = locationPoints[item.id];
                if (!pt) return null;
                const active = item.id === locationId;
                return (
                  <g
                    key={item.id}
                    className={`map-pin ${active ? "selected" : ""}`}
                    onClick={() => selectLocation(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectLocation(item.id); } }}
                    aria-label={`${item.city}, ${item.state} — ${item.drive} from ${item.near}`}
                  >
                    <circle className="pin-halo" cx={pt.fx} cy={pt.fy} r={active ? 16 : 11} />
                    <circle className="pin-core" cx={pt.fx} cy={pt.fy} r={active ? 6.5 : 5} />
                  </g>
                );
              })}
              {(() => {
                const pt = locationPoints[location.id];
                if (!pt || !visibleLocations.some((item) => item.id === location.id)) return null;
                // A single combined label avoids overlap even when the farm sits
                // just a few pixels from its city. Drop it below near the top edge.
                const anchorY = Math.min(pt.fy, pt.cy);
                const labelY = anchorY < 60 ? Math.max(pt.fy, pt.cy) + 22 : anchorY - 15;
                const labelX = (pt.fx + pt.cx) / 2;
                return (
                  <g className="map-callout" aria-hidden="true">
                    <text className="callout-label" x={labelX} y={labelY}>
                      {location.near} <tspan className="callout-drive">· {location.drive}</tspan>
                    </text>
                  </g>
                );
              })()}
            </svg>
            <div className="map-legend"><span className="lg-farm">Farm</span><span className="lg-city">Nearest city</span><span className="lg-line">Drive distance</span></div>
            <div className="map-hint">Select a pin to explore <span>↗</span></div>
          </div>
          <aside className="location-card" id="location-detail">
            <div className="location-photo media-slot"><span>LOCATION FILM / PHOTO</span><strong>{location.city}</strong></div>
            <div className="location-body"><h3>{location.city}, <em>{location.state}</em></h3><div className="distance-badge"><span className="distance-icon" aria-hidden="true">🚗</span><span className="distance-figure">{location.drive}</span><span className="distance-label">from {location.near}</span></div><p>{location.note}</p><div className="animal-tags">{location.animals.map((animal) => <span key={animal}>{animal}</span>)}</div><div className="available"><small>AVAILABLE HERE</small>{availableExperiences.map((item) => <span key={item.id}>{item.name}</span>)}</div><button className="primary-button full" onClick={() => document.getElementById("compare")?.scrollIntoView({ behavior: "smooth" })}>Explore this farm <span>→</span></button></div>
          </aside>
        </div>
      </section>

      <section className="compare section" id="compare">
        <div className="section-heading centered"><p className="kicker dark"><span>●</span> Choose your kind of day</p><h2>How do you want to <em>graze?</em></h2><p>All the options at {location.city}, compared clearly. No surprises—just pick the pace, privacy and experience that feels right.</p></div>
        <div className="experience-tabs" role="tablist">{availableExperiences.map((item) => <button role="tab" aria-selected={experience.id === item.id} key={item.id} onClick={() => chooseExperience(item.id)}><span>{item.eyebrow}</span>{item.name}</button>)}</div>
        <div className={`experience-feature ${experience.accent}`}>
          <div className="experience-media media-slot"><span>EXPERIENCE VIDEO · 20 SEC</span><div><small>{experience.eyebrow}</small><strong>{experience.duration}</strong></div></div>
          <div className="experience-copy"><p className="kicker dark">{experience.eyebrow}</p><h3>{experience.name}</h3><p className="experience-summary">{experience.summary}</p><div className="stat-grid"><div><small>TIME</small><strong>{experience.duration}</strong></div><div><small>SETTING</small><strong>{experience.privacy}</strong></div><div><small>GROUP</small><strong>{experience.capacity}</strong></div><div><small>FROM</small><strong>${experience.price.toFixed(experience.price % 1 ? 2 : 0)} <i>{experience.unit}</i></strong></div></div><p className="best-for"><span>♥</span><b>Best for</b> {experience.bestFor}</p></div>
          <div className="included"><p>Everything included</p>{experience.includes.map((item) => <span key={item}><i>✓</i>{item}</span>)}<button className="primary-button full" onClick={() => document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })}>Choose this experience <span>→</span></button></div>
        </div>
      </section>

      <section className="builder section" id="builder">
        <div className="section-heading split-heading"><div><p className="kicker dark"><span>●</span> Make it yours</p><h2>Build your<br /><em>best day ever.</em></h2></div><p>Your {experience.name} already includes plenty. Add only the moments that mean the most to your group.</p></div>
        <div className="builder-layout">
          <div className="builder-main">
            <div className="step-title"><span>01</span><div><small>YOUR BASE EXPERIENCE</small><strong>{experience.name}</strong></div><button onClick={() => document.getElementById("compare")?.scrollIntoView({ behavior: "smooth" })}>Change</button></div>
            <div className="guest-picker"><div><span>02</span><div><small>WHO’S COMING?</small><strong>Choose your herd size</strong></div></div><div className="counter"><button onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Remove guest">−</button><strong>{guests}<small>guests</small></strong><button onClick={() => setGuests(Math.min(12, guests + 1))} aria-label="Add guest">+</button></div></div>
            <div className="addon-heading"><span>03</span><div><small>ADD A LITTLE EXTRA MAGIC</small><strong>Popular ways to make it unforgettable</strong></div></div>
            <div className="addon-list">{compatibleAddOns.map((item, index) => { const checked = selectedAddOns.includes(item.id); return <button key={item.id} className={`addon ${checked ? "selected" : ""}`} onClick={() => toggleAddOn(item.id)}><div className="addon-visual"><span>{index % 2 ? "✦" : "♥"}</span><small>ADD-ON PHOTO</small></div><div className="addon-copy"><small>{item.brand}</small><strong>{item.name}</strong><p>{item.description}</p></div><div className="addon-price"><strong>+${item.price}</strong><i>{checked ? "✓" : "+"}</i></div></button> })}</div>
          </div>
          <aside className="booking-summary">
            <p className="kicker dark">Your Cowabunga day</p><h3>{location.city}, {location.state}</h3><div className="summary-media media-slot"><span>SELECTED FARM</span></div><div className="summary-row"><span>{experience.name}<small>{guests} guests · {experience.duration}</small></span><strong>${baseTotal.toFixed(2)}</strong></div>{compatibleAddOns.filter((item) => selectedAddOns.includes(item.id)).map((item) => <div className="summary-row addon-row" key={item.id}><span>{item.name}</span><strong>${item.price.toFixed(2)}</strong></div>)}<div className="summary-total"><span>Total<small>${perPerson.toFixed(2)} per person</small></span><strong>${total.toFixed(2)}</strong></div><button className="primary-button full">Check dates & availability <span>→</span></button><p className="reassurance">Free under 5 · Secure checkout · Exact directions after booking</p>
          </aside>
        </div>
      </section>

      <section className="story-strip"><div className="story-media media-slot"><span>BRAND FILM · 45 SEC</span><button aria-label="Play brand film">▶</button></div><div><p className="kicker"><span>●</span> More than a farm visit</p><h2>Come for the cows.<br /><em>Leave a little lighter.</em></h2><p>The real magic is slowing down, getting close and sharing something joyful with the people you love.</p><a href="#finder">Find your farm <span>↗</span></a></div></section>
      <footer><div className="brand footer-brand"><span className="brand-mark">C</span><span>COWABUNGA<small>CAMP</small></span></div><p>Fluffy cows. Cozy vibes. Core memories.</p><div><a href="#finder">Locations</a><a href="#compare">Experiences</a><a href="#builder">Plan a visit</a></div><small>Concept prototype · Content and media placements ready for production assets</small></footer>
    </main>
  );
}
