import { useRouteError } from "react-router-dom";

export default function error() {
  
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="d-flex align-items-center justify-content-center flex-column" style={{height: "100vh", 
      backgroundImage: `url(/erro.webp)`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat'}}>
      <div className="bg-body bg-opacity-75 d-flex align-items-center justify-content-center flex-column rounded p-3">
        <h1 className="fs-1">Oops!</h1>
        <p className="fs-1">Desculpe, algo inesperado aconteceu</p>
        <p className="fs-1">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}