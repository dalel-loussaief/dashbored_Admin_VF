import React, { useState, useEffect } from "react";
import "./AreaTable.scss";

const AreaTable = () => {
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    // Effectue une requête GET pour récupérer les données des propriétés
    fetch("http://localhost:8000/userAuth/api/propertieStat/")
      .then(response => response.json())
      .then(data => {
        // Mise à jour des propriétés avec le nom de l'emplacement
        setPropertyData(data);
      })
      .catch(error => console.error("Error fetching property data:", error));
  }, []); 

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Property</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              <th>Property Titre</th>
              <th>Property Surface</th>
              <th>Property Dispo</th>
              <th>Property Prix</th>
            
            </tr>
          </thead>
          <tbody>
            {propertyData.map((property, index) => (
              <tr key={index}>
                <td>{property.property_titre}</td>
                <td>{property.property_surface} m2</td>
                <td>{property.property_dispo}</td>
                <td>{property.property_prix} DTN</td>
             
         
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
