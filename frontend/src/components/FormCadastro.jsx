import { useFormValidation } from "../services/useFormValidation";

export default function FormCadastro(props){

    return (
        <section className="bg-[#0c0c0c] p-8 rounded-3xl border border-zinc-800 shadow-[0_0_60px_-15px_rgba(147,51,234,0.15)] max-w-xl mx-auto">
      <form onSubmit={props.cadastrar} className="space-y-6">
        <div className="space-y-2 text-center">
            <h1 className="text-3xl font-extrabold text-white tracking-tighter">
                Cadastro de Usuários
            </h1>
            <p className="text-zinc-500 text-sm">Adicione novos membros ao sistema</p>
        </div>

        <div className="space-y-4 pt-4">

          <div className="relative">
            <input
              name="nome"
              type="text"
              placeholder="@usuario"
              value={props.values.nome}
              onChange={props.handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder-zinc-600 shadow-inner"
            />
          </div>
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
            placeholder="Senha segura"
            value={props.values.senha}
            onChange={props.handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder-zinc-600 shadow-inner"
          />
          {props.errors.senha.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                    {props.errors.senha.map((err, i) => (
                        <span key={i} className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                            {err}
                        </span>
                    ))}
                </div>
            )}
        </div>

        <button 
          type="submit" 
          disabled={!props.isValid}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/30 active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
        >
          {props.isValid ? "Cadastrar Usuário" : "Preencha os Campos"}
        </button>
      </form>
    </section>
    )
}