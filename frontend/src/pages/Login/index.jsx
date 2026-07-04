import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Login(){
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({nome: nome, senha: senha})
            })

            if(!response.ok) {
                throw new Error("Credenciais inválidas"); 
            }

            
            const data = await response.json();
            localStorage.setItem("token", data.token);

            navigate("/home");
        } catch (erro) {
            if (erro instanceof Error) {
                setErro(erro.message);
            } else {
                setErro("Erro inesperado.")
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
    <form 
        onSubmit={handleSubmit}
        className="bg-[#121212] p-8 rounded-2xl shadow-2xl border border-purple-900/30 w-full max-w-sm space-y-6"
    >
        <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white text-center tracking-tight">
                Bem-vindo
            </h1>
            <p className="text-purple-400 text-sm text-center">Faça login para continuar</p>
        </div>

  
        {erro && (
            <div className="bg-red-500/10 border-l-4 border-red-500 p-3">
                <p className="text-xs text-red-400 font-medium">{erro}</p>
            </div>
        )}

        <div className="space-y-4">

            <div className="group">
                <input 
                    type="text"
                    placeholder="Usuário (@...)"
                    className="w-full bg-[#1e1e1e] border border-zinc-800 text-white px-4 py-3 rounded-xl 
                               focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent 
                               transition-all duration-300 placeholder-zinc-500"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>


            <div className="group">
                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full bg-[#1e1e1e] border border-zinc-800 text-white px-4 py-3 rounded-xl 
                               focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent 
                               transition-all duration-300 placeholder-zinc-500"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
        </div>

        <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl 
                       shadow-lg shadow-purple-900/20 active:scale-[0.98] transition-all duration-200"
        >
            Entrar
        </button>
    </form>
</div>
    )
}

export default Login