export default function LogoutButton(props){
    return(
        <button 
            onClick={props.logout}
            className="absolute top-6 right-6 md:top-10 md:right-10 px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-purple-600 transition-all active:scale-95 shadow-lg"
          >
            Sair (Logout)
        
          </button>
    )
}