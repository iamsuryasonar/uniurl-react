import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import useOnScreen from '../hooks/useOnScreen'
import { useDispatch } from 'react-redux';

function Image({ id, src, alt, deleteImage }) {
    const [ref, isVisible] = useOnScreen({ threshold: 0 });
    const [loadedImage, setLoadedImage] = useState(false);

    const handleImageLoad = () => {
        setLoadedImage(true);
    };

    const dispatch = useDispatch();

    function deleteImageHandler(id) {
        dispatch(deleteImage(id));
    }

    return <div ref={ref}
        style={{
            transform: isVisible ? 'translateY(0%)' : '',
            opacity: isVisible ? '1' : '',
        }}
        className='w-full h-full mb-4 relative grid rounded-lg translate-y-[50px] opacity-0 transition-all duration-500 ease-in-out'>
        {
            !loadedImage && <div className={`h-[200px] bg-slate-200 animate-pulse`}></div>
        }
        <div className={`${loadedImage ? 'animate-none' : 'bg-base-200 animate-pulse'} `}>
            <img src={src} alt={alt} loading='lazy' onLoad={() => handleImageLoad()}></img>
        </div>
        {loadedImage && <button className={`w-[30px] absolute top-1 right-1 p-1 text-slate-600 bg-slate-50 hover:text-red-400 hover:bg-red-50  aspect-square rounded-full`} onClick={() => deleteImageHandler(id)}>
            <FontAwesomeIcon icon={faTrash} />
        </button>}
    </div>
}

export default Image;