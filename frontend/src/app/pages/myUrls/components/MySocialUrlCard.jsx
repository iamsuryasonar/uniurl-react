import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Reorder, useDragControls } from "framer-motion";
import { useState } from 'react';
import UrlForm from './UrlForm';
import { update_url } from '../../../store/slices/myUrlSlice';

function MySocialUrlCard({ urlData, onDelete }) {
    const { _id, title, url } = urlData;

    const [showEditUrlMenu, setShowEditUrlMenu] = useState(false);

    return (
        <>
            <Reorder.Item
                value={urlData}
                id={_id}
                dragListener={true}
                className='my-4 bg-[#171717] text-white group hover:bg-slate-200 hover:text-black w-full px-4 py-2 rounded-lg flex flex-row justify-between items-center gap-1 select-none'
            >
                <a href={url} target='_blank' rel='noopener' className={`w-full cursor-pointer`} tabIndex={0} aria-label={`${title} url`}>
                    <div className={`w-full flex flex-row justify-between items-center cursor-pointer`}>
                        {urlData?.icon && <FontAwesomeIcon style={{ color: urlData?.color }} className='w-6 h-6 p-2 rounded-full aspect-square text-2xl border-[1px] border-white group-hover:border-black' icon={urlData?.icon} />}
                        <p className='flex items-center gap-2 text-xl px-1 text-center'>
                            {title}
                        </p>
                        <div className='flex gap-1'>
                            <button onClick={(e) => {
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
                                <FontAwesomeIcon aria-label="Edit" tabIndex={0} icon={faEdit} className='p-2 hover:bg-black hover:text-green-500 rounded-full' />
                            </button>
                            <button onClick={(e) => {
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
                                <FontAwesomeIcon aria-label="Delete" tabIndex={0} icon={faTrash} className='p-2 hover:bg-black hover:text-red-500 rounded-full' />
                            </button>
                        </div>
                    </div>
                </a>
            </Reorder.Item >
            {
                showEditUrlMenu && <UrlForm type={'EDIT'} urlData={urlData} setShowMenu={setShowEditUrlMenu} onSubmit={update_url} />
            }
        </>
    )
}

export default MySocialUrlCard;