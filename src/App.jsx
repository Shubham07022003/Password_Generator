import { useState , useCallback, useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numallowed, setnumalloed]= useState(false)
  const [char,setchar]= useState(false)  
  const [password, setpassword]= useState("")
  //useRef hook
  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(()=>{
    let pass =""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numallowed) str+="0123456789"
    if(char) str+="!@#$%^&*-_=[]{}~`"

    for(let i=1; i<=length;i++){
      let char =Math.floor(Math.random()*str.length +1)
      pass +=str.charAt(char)
    }
    setpassword(pass)

  } ,[length ,numallowed,char,setpassword])

  const copyPasswordClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)// seclect range
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {passwordgenerator()}, [length,numallowed,char,passwordgenerator])


  return (
    <>
    
     <div className='w-full max-w-md mx-auto shadow-md rounded px-4 my-8 text-orange-500 bg-gray-700 rounded-md'>
     <h1 className=' text-4xl  text-center text-white my-4'>password generator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
     <input 
     type="text" 
     value={password}
     className='outline-none w-full py-1 px-3'
     placeholder='password'
     readOnly
     ref={passwordRef}

     />
     <button 
     onClick={copyPasswordClipboard}
     className='outline-none bg-blue=600 text-Blue px-3 py-0.5 shrink-5'>copy</button>

     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex item-Center gap-x-1'>
        <input type="range" min={6}
         max={100}
         value={length}
         className='cursor-pointer'
         onChange={(e)=>{setlength(e.target.value)}}
         />
         <label> Length:{length}</label>
      </div>
      <div>
       <input className='cursor-pointer'
       
       type="checkbox" name="" id="numberInput"
       defaultChecked={numallowed}
       onChange={()=>{
        setnumalloed((prev)=> !prev);
       }}
       />
       <label htmlFor="numberInput">number</label>

      </div>
      <div className='flex item-center gap-x-1'>
        <input 
        className='cursor-pointer'
        type="checkbox" 
        defaultChecked={char}
        id="characterInput" 
        onChange={ ()=>{
          setchar((prev)=>!prev);
        }}
        />
       <label htmlFor='characterInput'> character </label>

      </div>

     </div>

     </div>




    </>
  )
}

export default App
