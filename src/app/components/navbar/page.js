'use client'

export default function Navbar({signOut, user}) {
    return (
      <div className=" ">
        <div className=" flex justify-center align-middle w-screen h-10 col bg-slate-600 ">
          <div className="mr-auto ml-10 my-auto ">
            <h1 className=" text-1xl text-white font-bold  ">Journal</h1>  
          </div> 
          <div className=" mr-10 ml-auto my-auto">
            <button onClick={signOut} className="w-28 hover:bg-slate-900 rounded-xl bg-slate-800 text-white font-bold mx-auto  ">Logout</button>  
          </div> 
        </div>
      </div>
    )
}