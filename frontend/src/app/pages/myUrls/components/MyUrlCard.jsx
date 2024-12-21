
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function MyUrlCard({ urlData, onClick, onDelete }) {
    const { _id, title, url } = urlData;

    return (
        <a href={url} target='_blank' rel='noopener' className={`bg-[#171717] text-white group hover:bg-slate-200 hover:text-black w-full px-4 py-2 rounded-lg flex flex-row justify-between items-center cursor-pointer`} tabIndex={0} aria-label={`${title} url`}>
            {urlData?.icon && <FontAwesomeIcon style={{ color: urlData?.color }} className='w-6 h-6 p-2 rounded-full aspect-square text-2xl border-[1px] border-white group-hover:border-black' icon={urlData?.icon} />}
            <p className='flex items-center gap-2 text-xl px-2 text-center'>
                {title}
            </p>
            <button onClick={(e) => {
                e.preventDefault()
                onDelete(e, _id)
                e.stopPropagation();
            }}
                onKeyDown={(e) => {
                    e.preventDefault()
                    if (e.key === 'Enter') {
                        onDelete(e, _id);
                    }
                    e.stopPropagation();
                }} >
                <FontAwesomeIcon aria-label="Delete" tabIndex={0} icon={faTrash} className='p-4 hover:bg-black hover:text-red-500 rounded-full' />
            </button>
        </a>
    )
}

export default MyUrlCard;