'use client'
import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function Input({user}) {
    const [newentry, setNewentry] = useState('')
    const email = user.attributes.email
    const id = uuidv4();
    const formdata = {id, email, newentry}

    function hanndleSubmit(e) {
        e.preventDefault()
        console.log(formdata)   
        fetch('https://iykf2wwbu4.execute-api.eu-north-1.amazonaws.com/dev/entries', {
            method: 'POST',
            body: JSON.stringify({formdata})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        setNewentry("")
    }
 
      

    return (
        <div className=" flex justify-center align-middle w-screen h-96 col  ">
          <form onSubmit={hanndleSubmit}  className="flex flex-col justify-center align-middle w-screen h-full col mx-auto  ">
            <textarea value={newentry} onChange={(e)=>setNewentry(e.target.value)} className="w-3/5 h-1/2 rounded-xl outline-4 bg-slate-200 border-4 text-black mx-auto mt-10 pl-2  " placeholder="Enter your text here"/>
            <button type="submit" className="w-28 hover:bg-slate-900 rounded-xl bg-slate-800 text-white font-bold mx-auto mt-10 ">Submit</button>
          </form>
      </div>
    )
}