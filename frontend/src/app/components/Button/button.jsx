import s from './button.module.css'

function Button({ onClick, label }) {
    return (
        <>
            <button onClick={onClick} className={s.custom_button}> {label}</button>
        </>
    )

}

export default Button;