function Button({ className, onClick, label }) {
    return (
        <>
            <button onClick={onClick} className={`px-2 py-1 bg-black text-white cursor-pointer ${className}`}> {label}</button>
        </>
    )

}

export default Button;