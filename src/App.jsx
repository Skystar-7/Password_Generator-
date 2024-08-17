import { useState ,useCallback,useEffect,useRef} from 'react'
//These are hooks used in this project
import './App.css'
//UseCallBack hook is used here as same function is used by all useState
function App() {
  const [length, setLength] = useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false)
  const[characterAllowed,setCharacter]=useState(false)
  const[password,setPassword]=useState("")
  //useRef hook
  const passwordRef=useRef(null);

  const PasswordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   if(numberAllowed) str+="0123456789"
   if(characterAllowed) str+="!@#$%^&*[]+_~"
   for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1)
    //pass=str.charAt(char)
    //Here password is overriden only one charcater will be generated
    pass+=str.charAt(char)
  }
  setPassword(pass);
}, [length, numberAllowed, characterAllowed,setPassword]);
//use etPaaword to save memory space by keeping it in cache


const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  //incase if pswd is null
  //passwordRef.current?.setSelectionRange(0,3)
  //case when you want user to select within range
  navigator.clipboard.writeText(password);
//THIS LINE is responsible for copying pswd
//WE ARE using useRef to show whether pswd is selected or not to make differnce only useRef is used

 }, [password])
 //window.navigate is used in react but in nec.js there will be server

  useEffect(()=>{
    PasswordGenerator()
  
  },[length,numberAllowed,characterAllowed,setPassword])




  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input 
    type="text"
    value={password}
    className='outline-none w-full py-1 px-3'
    placeholder='Password'
    readOnly
       ref={passwordRef}
>
    </input>
    <button
    onClick={copyPasswordToClipboard}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
    >Copy</button>
    </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
    <input
    type="range"
    min={6}
    max={100}
    value={length}
className="cursor-pointer"
onChange={(e)=>{setLength(e.target.value)}}
/>
<label>Length:{length}</label>

      </div>
      <div className="flex items-center gap-x-1">
        <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=>{
          setNumberAllowed((prev)=>!prev);
          
        }}></input>
        <label htmlFor='numbersInput'>Numbers</label>
      </div>
    

    <div className="flex items-center gap-x-1">
        <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=>{
          setCharacter((prev)=>!prev);//False true hogya true false hogya call back function fire kra
          //setCharacter(true)
          //This cant be used as it will be always true even you change checkbox will change but will not change
        }}></input>
        <label htmlFor='charcaterInput'>Character</label>
      </div>
    </div>


    </div>
    </>
  )

  }

export default App
