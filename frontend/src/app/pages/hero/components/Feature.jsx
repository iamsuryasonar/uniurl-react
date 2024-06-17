function Feature({ title, text }) {
    return (
        <div className="w-full flex flex-col items-start p-3">
            <div className="max-w-[180px] mr-[2rem]">
                <div className='w-[38px] p-[2px] gradient_bar shadow-sm m-[0.2rem]'></div>
                <h1 className='text-white font-bold text-lg mb-1'>{title}</h1>
            </div>
            <div className="max-w-[390px] w-full flex text-white">
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Feature;