import { useState } from 'react'

import { ArrowRight } from 'lucide-react'
import { SparklesCore } from './ui/SparklesCore'
import { Button } from './ui/moving-border'
import { triggerState, value } from '../RecoilState'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Navigate, useNavigate } from 'react-router-dom'

export function Hero() {
  const [roomNo, setRoomNo] = useState('')
  const setTrigger= useSetRecoilState(triggerState);
  const setRoomVal=useSetRecoilState(value);
  const navigate=useNavigate();

  const handleEnterChat = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Entering room: ${roomNo}`);
    setTrigger(true);
    setRoomVal(roomNo);
    navigate("\chat");
  }

  return (
    <section className="relative flex-grow flex items-center font-grotesk justify-center mt-5 p-4 bg-black">
      <div id='home' className="container mx-auto  text-center">
        <h1  className="text-5xl font-bold mb-6 animate-fade-in-down">Get a Group, Reveal your Secret !</h1>
<div className='flex justify-center'>
<div className="relative w-full max-w-[300px] h-0.5 mt-2 ">
    <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    <div className="absolute top-0 left-1/3 transform -translate-x-1/2 w-24 h-full blur-md rounded-full bg-blue-800 opacity-30 transition-opacity ease-in-out opacity-8 <STATE>:opacity-10"></div>
  </div>
</div>
       

  {/* Curved Particle Effect */}
  <div className='flex justify-center'>
  <div className="relative w-full max-w-[350px] mt-2.5 ">
    <div className="relative w-full h-20">
      <div className="absolute inset-0 bg-black rounded-b-full transition-opacity ease-in-out opacity-8 <STATE>:opacity-10 duration-300 overflow-hidden">
        <SparklesCore
          id="particles-below-line"
          background="transparent"
          minSize={0.4} // Smaller particles
          maxSize={0.8}
          speed={5}
          particleSize={0.7}
          particleDensity={1500} // High density for concentration
          className="w-full h-full"
          particleColor="#FFFFFF" // White particles
        />
      </div>
    </div>
  </div>
  </div>

  <p className="text-2xl mb-8 animate-fade-in-up mt-10 text-center text-gray-200">
 <span className='text-blue-500 font-bold'>No login</span> required. Just enter a <span className='text-blue-500 font-bold'>room number </span> and start chatting.
</p>
<form onSubmit={handleEnterChat} className="flex justify-center items-center gap-4 pt-20 mb-4">
  <input
    type="text"
    placeholder="Enter room number"
    value={roomNo}
    onChange={(e) => setRoomNo(e.target.value)}
    className="w-64 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
  />
 
  <Button 
    borderRadius="1.75rem" className="text-gray-300  hover:text-white font-code font-bold text-sm transition duration-300 p-3" 
  >
    Enter Chat <ArrowRight className="ml-2" />
  </Button>  

 
</form>

      </div>
    </section>
  )
   
}

