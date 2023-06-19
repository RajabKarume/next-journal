'use client'
import {useState} from 'react'

export default function Input({user}) {
    const [entry, setEntry] = useState('')
    const email = user.attributes.email
    function hanndleSubmit(e) {
        e.preventDefault()
        fetch('https://iykf2wwbu4.execute-api.eu-north-1.amazonaws.com/dev/entries', {
            method: 'POST',
            body: JSON.stringify({entry, email})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        setEntry("")
    }
    function handleClick() {
        fetch('https://8kubiwayjf.execute-api.eu-north-1.amazonaws.com/dev/entries')
        .then(response => response.json())
        .then(data => console.log(data))
    }

    return (
        <div className=" flex justify-center align-middle w-screen h-96 col  ">
          <form onSubmit={hanndleSubmit}  className="flex flex-col justify-center align-middle w-screen h-full col mx-auto  ">
            <textarea value={entry} onChange={(e)=>setEntry(e.target.value)} className="w-3/5 h-1/2 rounded-xl outline-4 bg-slate-200 border-4 text-black mx-auto mt-10 pl-2  " placeholder="Enter your text here"/>
            <button type="submit" className="w-28 hover:bg-slate-900 rounded-xl bg-slate-800 text-white font-bold mx-auto mt-10 ">Submit</button>
          </form>
          <button className="w-28 hover:bg-slate-900 rounded-xl bg-slate-800 text-white font-bold mx-auto mt-10" onClick={handleClick} > Get Data </button>
      </div>
    )
}