import Header from './components/Header'
import Hero from './components/Hero'
import Globe from './components/Globe';

export default async function Home() {



  return (

    <>
      <div className='h-screen overflow-hidden w-screen'>
        <Header></Header>
        <div className="bg-black flex flex-col  overflow-hidden  relative">
          <Globe />
          <div className="flex w-full h-screen overflow-hidden justify-normal items-center bg-opacity-50 bg-[#21145C] relative">
            <div className="blur1 absolute"></div>
            <div className="blur2 absolute"></div>


            <Hero></Hero>



          </div>
        </div>



      </div>
      <div className='h-[2000px] w-full bg-white'>


      </div>




    </>
  );
}
