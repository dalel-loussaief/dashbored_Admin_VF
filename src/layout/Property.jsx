import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit , MdAdd} from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import { useParams } from "react-router-dom"; // Importez useParams pour récupérer les paramètres d'URL
import { Link } from "react-router-dom";
import { AreaTop } from "../components";
import EditPropertyForm from "./EditPropertyForm";

const Property = () => {
  const [properties, setProperties] = useState([
    // Vos données de propriété vont ici
    {id: 1,
        name: "Villa ",
        location: "Oregon, Homeland Street, plot 345",
        price: "450,000",
        available: "yes",
        dimensions: "3000 sq ft",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        image: "https://via.placeholder.com/150" 
    },
    {id: 2,
        name: "Home",
        location: "Oregon, Homeland Street, plot 345",
        price: "450,000",
        available: "No",
        dimensions: "3000 sq ft",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        image: "https://via.placeholder.com/150"
    }
  ]);

  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 4;

  const { id } = useParams(); // Récupérez l'identifiant de la propriété à partir de l'URL

  const openDeleteModal = (propertyId) => {
    setSelectedProperty(propertyId);
    deleteModal.show();
  };

  const closeDeleteModal = () => {
    setSelectedProperty(null);
    deleteModal.hide();
  };

  const closeEditModal = () => {
    setSelectedProperty(null);
    editModal.hide();
  };

  useEffect(() => {
    setDeleteModal(new Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false }));
  }, []);
  
  const renderProperties = () => {
    const filteredProperties = properties.filter(property =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    return currentProperties.map(property => (
      <tr key={property.id}>
        <td>{property.name}</td>
        <td>{property.location}</td>
        <td>{property.price}</td>
        <td>{property.available}</td>
        <td>{property.description}</td>
        <td>{property.dimensions}</td>
        <td>
          <img src={property.image} alt={property.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
        </td>
        <td>
        <Link to={`/EditPropertyForm/${property.id}`} state={{editedProperty : property }}>
          <button className="btn btn-primary" >
            <MdEdit />
          </button>
          </Link>
          <button className="btn btn-danger" onClick={() => openDeleteModal(property.id)}>
            <MdDelete />
          </button>
        </td>
      </tr>
    ));
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
    <AreaTop/>
    <br />
    <div style={{ textAlign: "center" }}>
      <h2>Property List</h2>
      <div className="d-flex justify-content-end mb-3">
        {/* <Link to="/PropertyAdd">
          <MdAdd style={{ color: "#007bff", fontSize: "24px", cursor: "pointer", marginRight: "5px" }} />
        </Link> */}
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>available</th>
            <th>description</th>
            <th>dimensions</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderProperties()}</tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {[...Array(Math.ceil(properties.length / propertiesPerPage))].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Delete Property</h5>
              <button type="button" className="btn-close" onClick={closeDeleteModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this property?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={closeDeleteModal}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Property</h5>
              <button type="button" className="btn-close" onClick={closeEditModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedProperty && <EditPropertyForm property={selectedProperty} />}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default Property;
