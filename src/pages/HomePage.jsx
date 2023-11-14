import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import ProductosList from "@components/ProductosList";
import SearchInput from "@components/SearchInput";
import Paginator from "@components/Paginator";

const HomePage = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [btnSearch, setBtnSearch] = useState(true);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const regApi = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/productos/?page=${page}&search=${search}&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": `${import.meta.env.VITE_API_URL}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error en la llamada a la API ${response.statusText}`);
      }
      const data = await response.json();
      const { productos, totalPages: pages, total } = data;
      setProductos(productos);
      setPages(pages);
      setError(false);
      setTotal(total);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        handleSearchError();
      }, 2000);
      setError(true);
    }
  }, [page, search, setProductos]);

  const handleSearchError = () => {
    setSearch("");
    setPage(1);
    setError(false);
  };

  const handleSearch = () => {
    setBtnSearch(false);
    setPage(1);
  };

  useEffect(() => {
    if (btnSearch === false) {
      regApi();
    }
  }, [btnSearch, regApi, error]);

  return (
    <div className="container p-9 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", backgroundColor: "#fce4ec" }}>
    <img src="/assets/logito.png" alt="logo" className="d-flex flex-column flex-md-row justify-content-center align-items-center text-center mx-auto" />

    <h1 className="text-center my-4 display-4" style={{ color: "#e91e63" }}>Bazar Online</h1>

    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center text-center mx-auto">
      <SearchInput search={search} setSearch={setSearch} />
      <button
        className={`btn btn-primary ${btnSearch ? "visible" : "invisible"}`}
        onClick={handleSearch}
        style={{ backgroundColor: "#e91e63", marginLeft: "10px" }}
      >
        Buscar
      </button>
    </div>

    {error && (
      <div className="alert alert-danger mt-4" style={{ backgroundColor: "#f8d7da", borderRadius: "10px" }}>
        <p className="font-weight-bold" style={{ color: "#721c24" }}>Error</p>
        <p style={{ color: "#721c24" }}>Hubo un error en la búsqueda</p>
      </div>
    )}

    {productos.length === 0 && !error && !btnSearch && (
      <div className="alert alert-warning mt-4" style={{ backgroundColor: "#fff3cd", borderRadius: "10px" }}>
        <p className="font-weight-bold" style={{ color: "#856404" }}>No hay productos</p>
        <p style={{ color: "#856404" }}>No se encontraron productos</p>
      </div>
    )}

    {productos.length > 0 && (
      <>
        <p className="text-center my-4 text-secondary font-weight-bold">
          Mostrando {productos.length} de {total} productos
        </p>
        <ProductosList productos={productos} />
        <Paginator page={page} pages={pages} setPage={setPage} />
      </>
    )}
  </div>
  );
};

export default HomePage;
