import { useParams, useNavigate, Link } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";

const ProductoCard = ({ producto }) => {
  const { _id, title: nombre, price: precio, thumbnail: imagen } = producto;

  const navigate = useNavigate();

  return (
    <div className="card">
      <img src={imagen} alt={nombre} className="card-img-top" />
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">{producto.category}</p>
        </div>
        <p className="card-subtitle text-muted">{producto.description}</p>
        <p className="card-text my-2">Precio: ${precio}</p>
        <div className="d-flex align-items-center gap-4">
          {Array.from(Array(5), (e, i) => {
            if (i + 1 <= producto.rating) {
              return <FaStar key={i} />;
            } else if (i + 0.5 <= producto.rating) {
              return <FaStarHalf key={i} />;
            } else {
              return <FaStar key={i} />;
            }
          })}
        </div>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-primary text-black"
          type="button"
          onClick={() => {
            navigate(`/producto/${_id}`);
          }}
        >
          Ver Producto
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;
