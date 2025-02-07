import Header from './components/Header'
import Hero from './components/Hero'
export default function Home() {
  return (
    <>
    <div className='h-screen w-screen'>


          <Header></Header>
      <div className="bg-black flex flex-col   relative">

        <div className="flex w-full h-screen overflow-hidden justify-normal items-center bg-opacity-50 bg-[#21145C] relative">
          <div className="blur1 absolute"></div>
          <div className="blur2 absolute"></div>


        <Hero></Hero>

        

        </div>
      </div>


   
    </div>

 

     
    </>
  );
}
