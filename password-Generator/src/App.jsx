import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) 
      str += "0123456789"
    if (charAllowed)
      str += "~!@#$%^&*()_=+/-"

    for(let i=1; i<= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass); 

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback( ()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)
  }, [password] );

  useEffect( () => {
    passwordGenerator(); 
  }, [length, numberAllowed, charAllowed, passwordGenerator] );

  return (
    <>
      <div className="w-full max-x-md mx-auto shadow-md rounded-lg p-8 m-4 bg-gray-800 
      text-orange-500">
        <h1 className='text-white text-center text-2xl p-2 mb-4'>
          Password Generator
        </h1>
        <div className='flex shadow-[0_6px_16px_rgba(255,255,255,0.08)] rounded-lg overflow-hidden mb-4'>
          <input className='outline-none w-full py-1 px-3 m-2'
          type='text' value={password} 
          placeholder='password' 
          readOnly
          ref={passwordRef}
          />
        
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '
          onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>

        <div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" min={6} max={30} value={length} className='cursor-pointer' 
              onChange={(e) => {setLength(e.target.value)}}/>

              <label>Length : {length}</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"
              onChange={ ()=> {setNumberAllowed( (prev)=> !prev ) }} />

              <label htmlFor="numberInput">Numbers</label>
            </div>
            
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={charAllowed} id="characterInput"
              onChange={ ()=> {setCharAllowed( (prev)=> !prev ) }} />

              <label htmlFor="characterInput">Characters</label>
            </div>

          </div>
        </div>

      </div>

    </>
  )
}

export default App
