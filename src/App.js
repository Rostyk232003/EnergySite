import Image from "next/image";
import ShopCard from "./components/shop-card/ShopCard";

export default function App() {
  const cards = [
    {
      id: "solar",
      title: "Solar Energy",
      description: "Monitor real-time solar production and efficiency.",
    },
    {
      id: "wind",
      title: "Wind Energy",
      description: "Track wind turbine output and performance metrics.",
    },
    {
      id: "battery",
      title: "Battery Storage",
      description: "Analyze storage levels and consumption trends.",
    },
  ];

  return (
    <>
      <div className="hero-section">
        <Image src="/solar.jpg" alt="Solar panels" fill className="hero-image" />

        <div className="hero-overlay">
          <h1>Smart Renewable Energy Monitoring</h1>
          <p>Track solar, wind and battery performance in real time</p>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row g-4">
          {cards.map((card) => (
            <div key={card.id} className="col-12 col-md-4">
              <ShopCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

