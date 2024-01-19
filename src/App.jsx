import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App(){
  const [length, setLength] = useState(8);
  const [capsAll, setCapsAll] = useState(false);
  const [numberAll, setNumberAll] = useState(false);
  const [charAll, setCharAll] = useState(false);
  const [pass, setPass] = useState("");

  const passGen = useCallback(() => {
    let Newpass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if(capsAll){
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if(numberAll){
      str += "0123456789";
    }
    if(charAll){
      str += "!@#$%^&*()_+~{}|[]/.,><;";
    }
    let x = length;
    let n = str.length;
    while(x--){
      let i = Math.floor(Math.random()*n);
      Newpass += str[i];
    }
    setPass(Newpass);
  }, [length, capsAll, numberAll, charAll, setPass])

  const copyToClip = useCallback(()=>{
    window.navigator.clipboard.writeText(pass);
    passRef.current?.select();
  }, [pass])

  useEffect(()=>{
    passGen();
  }, [length, capsAll, numberAll, charAll, passGen]
  )

  const passRef = useRef();

  return (
    <>
      <div className="bg-gray-800 p-4 w-6/12 mx-auto" style={{"minWidth":"500px"}}>
      <h1 className='text-white p-4 text-center text-5xl font-bold'>Password Generatror</h1>
      <div className='text-orange-500 w-full max-w-md mx-auto shadow-md rounded-xl px-4 my-8'>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={pass} className = 'font-bold outline-none w-full py-1 px-3' placeholder="Password" readOnly
          ref = {passRef}/> 
          <button onClick = {copyToClip} className='bg-blue-700 text-white px-3 shrink-0 font-bold'>copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" value={length} min={6} max={100} className='curson-pointer' onChange={(e)=>{setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={capsAll} id='capsInput' onChange={()=>{setCapsAll(!capsAll)}}/>
            <label>Capitals</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAll} id='numInput' onChange={()=>{setNumberAll(!numberAll)}}/>
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" value={charAll} defaultChecked={charAll} id='charInput' onChange={()=>{setCharAll(!charAll)}}/>
            <label>Characters</label>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
