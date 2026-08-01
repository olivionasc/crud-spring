import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormValidation } from "../../services/useFormValidation";
import FormCadastro from "../../components/FormCadastro";
import ListaUsuarios from "../../components/ListaUsuarios";
import FormEdit from "../../components/FormEdit";
import LogoutButton from "../../components/LogoutButton";

function Home(){

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const { values, errors, handleChange, isValid, setValues, resetValidation } = useFormValidation();

    useEffect(() => {
        async function fetchData(){
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
            }

            const response = await fetch("https://crud-spring-szh4.onrender.com/api/usuarios", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.log("Não autorizado");
                return;
            }

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            const data = await response.json();
            setUsuarios(data);
        }

        fetchData();
    }, []);

    function abrirEdicao(usuario) {
        resetValidation({
            nome: usuario.nome,
            senha: "" 
        });
        setUsuarioSelecionado(usuario);
    }

    async function salvarEdicao(){
        const token = localStorage.getItem("token");


        if (!usuarioSelecionado || !usuarioSelecionado.id) {
            console.log("Usuário inválido");
            return;
        }

        const body = { nome: values.nome };

        if (values.senha && values.senha.trim() !== "") {
            body.senha = values.senha;
        }

        const response = await fetch(
            `https://crud-spring-szh4.onrender.com/api/usuarios/${usuarioSelecionado.id}`,
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );

        if (!response.ok) {
            console.log("Erro ao editar");
            return;
        }

        const usuarioAtualizado = await response.json();

        
        setUsuarios((prev) =>
            prev.map((u) =>
                u.id === usuarioAtualizado.id ? usuarioAtualizado : u
            )
        );

        
        setUsuarioSelecionado(null);
        setValues({
            nome: "",
            senha: ""
        });
    }

    async function cadastrar(e){
    e.preventDefault();

    if (!isValid) return;

    const token = localStorage.getItem("token");

    const response = await fetch("https://crud-spring-szh4.onrender.com/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(values)
    });

    if (!response.ok) {
        console.log("Erro ao cadastrar");
        return;
    }

    const novoUsuario = await response.json();

    
    setUsuarios((prev) => [...prev, novoUsuario]);

    
    setValues({
        nome: "",
        senha: ""
    });
}

async function deletar(usuarioId) {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`https://crud-spring-szh4.onrender.com/api/usuarios/${usuarioId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.log("Status:", response.status);
            const texto = await response.text();
            console.log("Resposta:", texto);
            return;
        }

        setUsuarios((prev) => prev.filter(u => u.id !== usuarioId));

    } catch (error) {
        console.log("Erro na requisição:", error);
    }
}

function logout() {
    localStorage.clear();
    navigate("/");
}

    return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans relative">

     <LogoutButton
     logout={logout}
     />   

  <div className="max-w-7xl mx-auto space-y-12 mt-16 md:mt-12">

    <FormCadastro 
    cadastrar={cadastrar}
    values={values}
    errors={errors}
    handleChange={handleChange}
    isValid={isValid}
    setValues={setValues}
    />

    <ListaUsuarios
    usuarios={usuarios}
    abrirEdicao={abrirEdicao}
    deletar={deletar}
    />

   
    {usuarioSelecionado && (
      <FormEdit
      setValues={setValues}
      usuarioSelecionado={usuarioSelecionado}
      setUsuarioSelecionado={setUsuarioSelecionado}
      values={values}
      handleChange={handleChange}
      errors={errors}
      salvarEdicao={salvarEdicao}
      isValid={isValid}
      />
    )}
  </div>
</div>
    );
}

export default Home;
