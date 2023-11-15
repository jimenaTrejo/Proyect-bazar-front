
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Card } from "react-bootstrap";

const ProductoCard = ({ producto }) => {
  const { _id, title: nombre, price: precio, thumbnail: imagen } = producto;

  const navigate = useNavigate();

  return (
    <Card style={{ width: "18rem", margin: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <Card.Img variant="top" src={imagen} alt={nombre} />
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title>{nombre}</Card.Title>
          <Card.Text>{producto.category}</Card.Text>
        </div>
        <Card.Subtitle className="text-muted">{producto.description}</Card.Subtitle>
        <Card.Text className="my-2">Precio: ${precio}</Card.Text>
        <div className="d-flex align-items-center gap-1">
          {Array.from(Array(5), (e, i) => {
            if (i + 1 <=  producto.rating) {
              return <FaStar key={i} />;
            } else if (i + 0.5 <=  producto.rating) {
              return <FaStarHalf key={i} />;
            } else {
              return <FaStar key={i} />;
            }
          })}
        </div>
      </Card.Body>
      <Card.Footer>
        <button className="btn btn-primary" type="button" onClick={() => {
            navigate(`/producto/${_id}`);
          }}>
          Ver Producto
        </button>
      </Card.Footer>
    </Card>
  );
};

export default ProductoCard;