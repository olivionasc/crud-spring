export default function FormEdit(props){
  function cancelar(){
    props.setUsuarioSelecionado(null);
    props.setValues({
        nome: "",
        senha: ""
    });
  }
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => props.setUsuarioSelecionado(null)} 
        ></div>

   
        <div className="relative z-10 bg-[#0c0c0c] p-8 rounded-3xl border border-zinc-800 shadow-[0_0_80px_-15px_rgba(147,51,234,0.3)] w-full max-w-lg space-y-6">
            <div className="space-y-2 border-b border-zinc-800 pb-4">
                <h2 className="text-2xl font-extrabold text-white tracking-tighter">Editar Perfil</h2>
                <p className="text-zinc-500 text-sm">Modifique os dados do usuário <span className="text-purple-400">{props.usuarioSelecionado.nome}</span></p>
            </div>

          <div className="space-y-4 pt-2">
   
            <input
              name="nome"
              type="text"
              placeholder="@novo_nome"
              value={props.values.nome}
              onChange={props.handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder-zinc-600"
            />
            {props.errors.nome.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                    {props.errors.nome.map((err, i) => (
                        <span key={i} className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                            {err}
                        </span>
                    ))}
                </div>
            )}


            <input
              name="senha"
              type="password"
              placeholder="Nova senha ou mantenha vazio"
              value={props.values.senha}
              onChange={props.handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder-zinc-600"
            />
            {props.errors.senha.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                    {props.errors.senha.map((err, i) => (
                        <span key={i} className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">
                            {err}
                        </span>
                    ))}
                </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button 
              type="button" 
              onClick={props.salvarEdicao} 
              disabled={!props.isValid}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-all text-sm uppercase tracking-wider"
            >
              Salvar Alterações
            </button>
            <button 
              onClick={cancelar}
              className="w-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold py-3.5 rounded-xl hover:bg-zinc-800 hover:text-white transition-all active:scale-[0.98] text-sm uppercase tracking-wider"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
}