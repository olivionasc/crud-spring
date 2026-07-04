import UsuarioCard from "./UsuarioCard"

export default function ListaUsuarios(props){
    return(
        <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-4">
            <h2 className="text-xl font-bold text-zinc-300">Usuários Registrados</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {props.usuarios.map((usuario) => (
                <UsuarioCard
                usuario={usuario}
                abrirEdicao={props.abrirEdicao}
                deletar={props.deletar}
                />
            ))}
        </div>
    </section>
    )
}