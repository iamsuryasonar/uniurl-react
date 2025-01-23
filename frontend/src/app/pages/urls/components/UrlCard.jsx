
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { URL_TYPE } from "../../../constants";

function UrlCard({ urlData, theme }) {
    const { title, url, color } = urlData;

    return (
        <a href={url} target='_blank' rel='noopener' style={{ ...theme?.cardContainer, padding: urlData?.type === URL_TYPE.ICON_LINK ? '12px' : 0, minHeight: urlData?.type === URL_TYPE.AFFILIATE_LINK ? '140px' : 'auto' }} className={`w-full h-full cursor-pointer hover:scale-[1.04] transition-transform duration-300 ease-in-out overflow-clip`}>
            {(urlData?.type === URL_TYPE.ICON_LINK || urlData?.type === URL_TYPE.SOCIAL_LINK) && urlData?.icon && <FontAwesomeIcon style={{ ...theme?.cardIcon, ...{ color: theme?.cardIcon?.color ? theme?.cardIcon?.color : color } }} className='w-8 h-8 aspect-square' icon={urlData?.icon} />}
            {urlData?.type === URL_TYPE.AFFILIATE_LINK && urlData?.image && <div className="flex h-full w-[100px] bg-white">
                <img style={{ color: urlData?.color }} className='w-full h-full object-cover' src={urlData?.image.url} /></div>
            }
            <p className='w-full p-2 text-center text-wrap break-words whitespace-normal truncate'>{title}</p>
        </a>
    )
}

export default UrlCard;