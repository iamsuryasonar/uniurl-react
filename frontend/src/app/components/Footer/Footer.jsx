import s from './Footer.module.css'
import { APP_NAME } from '../../common/constants'
function Footer() {
    return (
        <div className={s.footer_main}>
            <p>Made with ReactJS</p>
            <p>{APP_NAME}</p>
            <p>2023©</p>
        </div >
    )
}
export default Footer;