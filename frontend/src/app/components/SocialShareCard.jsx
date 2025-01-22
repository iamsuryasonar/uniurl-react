import { useDispatch } from 'react-redux';
import { clearMessage, setMessage } from '../store/slices/messageSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons'

import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";

function SocialShareCard({ username }) {

    const originname = window.location.origin;

    const dispatch = useDispatch();

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(originname + '/' + username);
            dispatch(setMessage('copied To clipboard'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
        } catch (err) {
            dispatch(setMessage('could not copy To clipboard'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
        }
    };

    const getShareUrl = () => {
        if (!username) return '';
        return originname + '/' + username;
    }

    return <>
        <button
            className='w-full flex gap-2 justify-center items-center border-[1px] border-slate-300 hover:border-slate-600 rounded-full py-1 px-4'
            onClick={() => copyToClipboard(username)}>
            <FontAwesomeIcon icon={faLink} />
            <span>Copy link</span>
        </button>
        <div className='h-[1px] bg-slate-400 w-full'></div>
        <div className='flex flex-wrap gap-3 justify-center items-center'>
            <FacebookShareButton
                url={`${getShareUrl()}`}>
                <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
                url={`${getShareUrl()}`}>
                <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
                url={`${getShareUrl()}`}>
                <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <LinkedinShareButton
                url={`${getShareUrl()}`}>
                <LinkedinIcon size={40} round={true} />
            </LinkedinShareButton>
        </div>
    </>
}

export default SocialShareCard;