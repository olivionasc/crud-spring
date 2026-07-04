export default function UsuarioCard(props){
    return(
        <div 
                    key={props.usuario.id}
                    className="bg-[#0c0c0c] border border-zinc-800 rounded-2xl p-6 flex items-center justify-between gap-4 hover:border-zinc-700 transition-all hover:bg-[#111111]"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-950/50 border-2 border-purple-800 flex items-center justify-center text-purple-400 text-sm font-black">
                            {String(props.usuario.id).padStart(2, '0')}
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-xs text-zinc-500 font-medium">ID: {props.usuario.id}</p>
                            <p className="text-lg font-bold text-white tracking-tight">{props.usuario.nome}</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <button 
                            type="button" 
                            onClick={() => props.abrirEdicao(props.usuario)}
                            className="px-4 py-1.5 rounded-lg text-xs bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-purple-600 hover:border-purple-700 hover:text-white transition-colors"
                        >
                            editar
                        </button>
                        <button 
                            type="button" 
                            onClick={() => props.deletar(props.usuario.id)}
                            className="px-4 py-1.5 rounded-lg text-xs bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-red-950/60 hover:border-red-800 hover:text-red-200 transition-colors"
                        >
                            deletar
                        </button>
                    </div>
                </div>
    )
}