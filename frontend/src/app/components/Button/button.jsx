import s from './button.module.css'

function Button({ className, onClick, label }) {
    return (
        <>
            <button onClick={onClick} className={`${s.custom_button}  ${className}`}> {label}</button>
        </>
    )

}

export default Button;