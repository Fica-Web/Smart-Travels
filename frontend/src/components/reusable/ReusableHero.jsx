
const ReusableHero = ({ bgImage, title }) => {
    return (
        <div className='w-full md:h-[70vh] h-[60vh] bg-cover bg-center relative' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex flex-col ">
                    <h2 className="text-center text-white leading-none">
                        {/* <span className="uppercase md:text-2xl text-xl md:tracking-[10px] tracking-[3px]">Discover Your Next</span><br /> */}
                        <span className="text-8xl md:text-[12vw] font-coastal-clean tracking-wide ">{ title }</span>
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default ReusableHero;
