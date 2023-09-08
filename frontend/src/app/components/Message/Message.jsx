import s from './Message.module.css'
function message({ label }) {
    return (
        <div className={s.constainer}>
            <p>{label}</p>
        </div>
    )
}

export default message;