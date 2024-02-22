import { APP_NAME } from '../../common/constants'
function Footer() {
    return (
        <div className='flex flex-col items-center justify-center bg-black text-white w-full h-full p-4 '>
            <p>Made with ReactJS</p>
            <p>{APP_NAME}</p>
            <p>2023©</p>
        </div >
    )
}
export default Footer;