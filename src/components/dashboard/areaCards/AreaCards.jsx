import React, { useState, useEffect } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  const [userPercentage, setUserPercentage] = useState(0);
  const [testimonialCount, setTestimonialCount] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);

  useEffect(() => {
    // Appel à l'API pour compter les utilisateurs
    fetch("http://localhost:8000/userAuth/api/count_users/")
      .then(response => response.json())
      .then(data => setUserPercentage(data.user_count))
      .catch(error => console.error("Error fetching user count:", error));

    // Appel à l'API pour compter les témoignages
    fetch("http://localhost:8000/userAuth/api/count_temoinages/")
      .then(response => response.json())
      .then(data => setTestimonialCount(data.temoinage_count))
      .catch(error => console.error("Error fetching testimonial count:", error));

    // Appel à l'API pour compter les propriétés
    fetch("http://localhost:8000/userAuth/api/count_properties/") // Assurez-vous de remplacer l'URL par l'adresse de votre API Django pour les propriétés
      .then(response => response.json())
      .then(data => setPropertyCount(data.property_count))
      .catch(error => console.error("Error fetching property count:", error));
  }, []);

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={userPercentage}
        cardInfo={{
          title: "Total des utilisateurs",
          value: `${userPercentage}%`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={testimonialCount} 
        cardInfo={{
          title: "Nombre de témoignages",
          value: `${testimonialCount}%`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={propertyCount} 
        cardInfo={{
          title: "Nombre de Propriétés",
          value: `${propertyCount}%`,
        }}
      />
    </section>
  );
};

export default AreaCards;
