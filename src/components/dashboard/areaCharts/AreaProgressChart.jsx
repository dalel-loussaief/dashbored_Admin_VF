import React, { useState, useEffect } from "react";
import axios from "axios";

const AreaProgressChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données des API
    const fetchData = async () => {
      try {
        const maisonResponse = await axios.get("http://localhost:8000/userAuth/maison-count/");
        const appartementResponse = await axios.get("http://localhost:8000/userAuth/appartement-count/");
        const villaResponse = await axios.get("http://localhost:8000/userAuth/villa-count/");
        const localResponse = await axios.get("http://localhost:8000/userAuth/local-count/");
        
        // Mettre à jour les données avec les résultats des API
        setData([
          { id: 1, name: "Maison", percentValues: maisonResponse.data.maison_count },
          { id: 2, name: "Appartement", percentValues: appartementResponse.data.appartement_count },
          { id: 3, name: "Villa", percentValues: villaResponse.data.villa_count },
          { id: 4, name: "Local commercial", percentValues: localResponse.data.local_count }
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Property selon categorie</h4>
      </div>
      <div className="progress-bar-list">
        {data.map((progressbar) => (
          <div className="progress-bar-item" key={progressbar.id}>
            <div className="bar-item-info">
              <p className="bar-item-info-name">{progressbar.name}</p>
              <p className="bar-item-info-value">{progressbar.percentValues}%</p>
            </div>
            <div className="bar-item-full">
              <div
                className="bar-item-filled"
                style={{
                  width: `${progressbar.percentValues}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaProgressChart;
