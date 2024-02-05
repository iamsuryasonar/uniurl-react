import s from './Message.module.css'
function message({ message }) {
    return (
        <div className={s.container}>
            {message}
        </div>
    )
}

export default message;