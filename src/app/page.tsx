import Gallery from "@/components/Gallery";
import ToggleBar from "@/components/ToggleBar";

const Home = () => {
  return (
    <main className="w-full min-h-screen" style={{ background: "linear-gradient(180deg, #373E44 -100%, #191B1F 100%" }}>
      <div className="flex justify-end items-start pt-[96px] px-4 lg:pr-[86px]">
        <section className="flex flex-col">
          <ToggleBar />
          <div className="mt-[21px] mb-[17px] mx-auto divider w-[612px] h-[4px] rounded-[2.46px]"></div>
          <Gallery />
          <div className="mt-[22px] mb-[86px] mx-auto divider w-[612px] h-[4px] rounded-[2.46px]"></div>
        </section>
      </div>
    </main>
  )
}

export default Home;