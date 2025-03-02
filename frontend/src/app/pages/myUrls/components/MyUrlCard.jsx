import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Reorder, useDragControls } from "framer-motion";
import { useState } from 'react';
import UrlForm from './UrlForm';
import { update_url } from '../../../store/slices/myUrlSlice';
import image from '../../../assets/avatar.jpg'
import { URL_TYPE } from '../../../constants';


function MyUrlCard({ urlData, onDelete }) {
    const { _id, title, url } = urlData;
    const controls = useDragControls();

    const [showEditUrlMenu, setShowEditUrlMenu] = useState(false);

    return (
        <>
            <Reorder.Item
                value={urlData}
                id={_id}
                dragListener={false}
                dragControls={controls}
                className='w-full py-1 pr-1 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-black group rounded-lg flex flex-row justify-between items-center gap-1 select-none shadow-md'
            >
                <FontAwesomeIcon icon={faGripVertical} className='p-[12px] cursor-grab touch-none' size='lg' onPointerDown={(e) => controls.start(e)} />
                <div className={`w-full h-full overflow-hidden cursor-pointer`}>
                    <div className={`h-full flex justify-between items-center`}>
                        <div className='w-full grid grid-cols-[auto_1fr] justify-center items-center'>
                            {(urlData?.type === URL_TYPE.ICON_LINK || urlData?.type === URL_TYPE.SOCIAL_LINK) && urlData?.icon && <FontAwesomeIcon style={{ color: urlData?.color }} className='w-6 h-6 p-2 rounded-full aspect-square text-2xl border-[1px] border-slate-400' icon={urlData?.icon} />}
                            {urlData?.type === URL_TYPE.AFFILIATE_LINK && urlData?.image && <img style={{ color: urlData?.color }} className='w-[100px] h-full aspect-square object-cover' src={urlData?.image.url} />}
                            <a href={url} target='_blank' rel='noopener' className='w-full text-base px-1 text-center text-wrap break-words whitespace-normal overflow-hidden'>
                                {title}
                            </a>
                        </div>
                        <div className='flex gap-1 justify-center items-center'>
                            <button className='flex items-center' onClick={(e) => {
                                e.preventDefault();
                                setShowEditUrlMenu(true);
                                e.stopPropagation();
                            }}
                                onKeyDown={(e) => {
                                    e.preventDefault()
                                    if (e.key === 'Enter') {
                                        setShowEditUrlMenu(true);
                                    }
                                    e.stopPropagation();
                                }} >
                                <FontAwesomeIcon aria-label="Edit" tabIndex={0} icon={faEdit} className='p-2 border-[1px] border-transparent hover:text-green-600 hover:border-green-600 rounded-full' />
                            </button>
                            <button className='flex items-center' onClick={(e) => {
                                e.preventDefault();
                                onDelete(e, _id);
                                e.stopPropagation();
                            }}
                                onKeyDown={(e) => {
                                    e.preventDefault()
                                    if (e.key === 'Enter') {
                                        onDelete(e, _id);
                                    }
                                    e.stopPropagation();
                                }} >
                                <FontAwesomeIcon aria-label="Delete" tabIndex={0} icon={faTrash} className='p-2 border-[1px] border-transparent hover:text-red-500 hover:border-red-500 rounded-full' />
                            </button>
                        </div>
                    </div>
                </div>
            </Reorder.Item >
            {
                showEditUrlMenu && <UrlForm type={'EDIT'} urlData={urlData} setShowMenu={setShowEditUrlMenu} onSubmit={update_url} />
            }
        </>
    )
}

export default MyUrlCard;