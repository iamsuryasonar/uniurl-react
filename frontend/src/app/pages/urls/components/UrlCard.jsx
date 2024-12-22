
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function UrlCard({ urlData, onClick, theme }) {
    const { title, url, color } = urlData;

    return (
        <a href={url} target='_blank' rel='noopener' style={theme?.cardContainer} className={`w-full flex justify-between items-center gap-2 text-xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out`}>
            {urlData?.icon && <FontAwesomeIcon className='w-8 h-8 aspect-square' style={{ ...theme?.cardIcon, ...{ color: theme?.cardIcon?.color ? theme?.cardIcon?.color : color } }} icon={urlData?.icon} />}
            <p className='text-center px-2'>{title}</p>
            <FontAwesomeIcon style={theme?.cardArrowIcon} icon={faArrowRight} className='w-5 h-5' />
            {(theme?.cardArrowIcon?.display === 'none') ? <div></div> : <></>}
        </a>
    )
}

export default UrlCard;