import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Você deve realizar o Login para poder acessar as funcionalidades do sistema.")
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;