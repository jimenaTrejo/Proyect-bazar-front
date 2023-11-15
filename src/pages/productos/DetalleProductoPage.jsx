// Objetivo: Mostrar el detalle de un producto
import { useLoaderData } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { obtenerProductoPorId } from "@data/productos.service";

export const loader = async ({ params }) => {
  const producto = await obtenerProductoPorId(params.id);
  return producto;
};

const DetalleProductoPage = () => {
  const producto = useLoaderData();
  return (
    <div className="container mx-auto mt-4 p-10 bg-light rounded-lg shadow-lg">
      <div className="row gap-4">
        <div className="col-md-6">
          <img
            className="w-100"
            src={producto.images[0]}
            alt={producto.title}
            
          />

          <div className="row row-cols-4 gap-4 mt-4">
            {producto.images.map((image, index) => (
              <div key={index} className="col">
                <img
                  className="w-100 h-20 object-cover"
                  src={image}
                  alt={producto.title}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <h1 className="text-2xl font-bold text-center">{producto.title}</h1>
          <p className="text-center text-muted">{producto.category}</p>
          <p className="text-muted">{producto.description}</p>

          <div className="d-flex flex-column mt-4">
            
            <button className="btn btn-primary mt-4">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetalleProductoPage;
