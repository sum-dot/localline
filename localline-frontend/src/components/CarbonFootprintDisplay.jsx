import { useCarbonFootprint } from "react-carbon-footprint";

function CarbonFootprintDisplay() {
  const [gCO2, bytesTransferred] = useCarbonFootprint();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        background: "rgba(255,255,255,0.9)",
        padding: "10px 14px",
        borderRadius: "10px",
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        fontSize: "0.85rem",
      }}
    >
      <strong>🌱 Network Carbon Footprint</strong>
      <p>Bytes Transferred: {bytesTransferred} bytes</p>
      <p>CO2 Emissions: {gCO2.toFixed(2)} g CO2eq</p>
      <p style={{ fontSize: "0.75em", color: "#666" }}>
        (Estimates based on network data transfer during this session)
      </p>
    </div>
  );
}

export default CarbonFootprintDisplay;
