import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { clearMessage, setMessage } from '../../../store/slices/messageSlice';
import Button from '../../../components/button/Button';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICON_ARRAY, URL_TYPE } from '../../../constants';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function UrlForm({ type, urlData, setShowMenu, onSubmit }) {

    const dispatch = useDispatch();

    const selectDivRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [color, setColor] = useColor(urlData?.color || '#000000');
    const [image, setImage] = useState(null);
    const [isSelectMenu, setSelectMenu] = useState(false);
    const [selectedLinkType, setSelectedLinkType] = useState(urlData?.type || URL_TYPE.ICON_LINK);

    const [selectedIcon, setSelectedIcon] = useState({
        name: ICON_ARRAY.filter((item) => {
            if (item.icon === urlData?.icon) {
                return item;
            }
        })[0]?.name || '',
        icon: urlData?.icon || ''
    });

    const [inputValue, setInputValue] = useState({
        'title': urlData?.title || '',
        'url': urlData?.url || '',
    });

    useEffect(() => { // this effect handles onClick outside of the custom select option
        const handleClickOutside = (event) => {
            if (selectDivRef.current && !selectDivRef.current.contains(event.target)) {
                setSelectMenu(false)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [selectDivRef]);

    const onChangeHandler = (e) => {
        setErrors({})
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        })
    }
    const onImageChangeHandler = (e) => {
        setErrors({})
        setImage(e.target.files[0]);
    }

    const onIconChangeHandler = (name, icon) => {
        setErrors({})
        setSelectedIcon({
            name: name,
            icon: icon,
        });
        setSelectMenu(false)
    }

    const handleLinkTypeChange = (e) => {
        setErrors({})
        setSelectedLinkType(e.target.value);
    }

    const submitHandler = () => {

        let newErrors = {};

        if (inputValue?.title?.length < 1) {
            newErrors.title = 'required';
        }

        if (inputValue?.url?.length < 1) {
            newErrors.url = 'required';
        }

        if (selectedLinkType === URL_TYPE.AFFILIATE_LINK && (!image & !urlData?.image?.url)) {
            newErrors.image = 'required';
        }

        if (selectedLinkType === URL_TYPE.SOCIAL_LINK && !selectedIcon?.icon) {
            newErrors.icon = 'required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const body = { ...inputValue, icon: selectedIcon?.icon, color: color?.hex, type: selectedLinkType, image }

        if (type === 'EDIT') {
            body._id = urlData._id;
        }

        dispatch(onSubmit(body))

        if (type === 'ADD') {
            setInputValue({
                'title': '',
                'url': '',
            })
            setSelectedIcon({
                name: '',
                icon: ''
            });
        }
        setShowMenu(false);
    }

    return (
        <div className='z-40 fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center'>
            <div className='relative max-w-2xl w-full m-4 bg-white text-black border-[1px] border-slate-300 rounded-lg overflow-clip'>
                <div className='p-2 px-4 sticky top-0 flex justify-between items-center bg-slate-50'>
                    <p className='font-bold'>{`${type === 'ADD' ? 'Add Url' : "Edit Url"}`}</p>
                    <button onClick={() => setShowMenu(false)} className='w-[34px] aspect-square text-black border-slate-300 rounded-full border-[1px] hover:bg-slate-100 hover:text-black hover:border-black'>
                        <FontAwesomeIcon icon={faClose} size={'lg'} />
                    </button>
                </div>
                <div className='relative w-full px-4 pt-2 pb-6  max-h-[80svh] h-full overflow-auto overscroll-contain flex flex-col gap-2'>
                    <div className=''>
                        <label htmlFor="link types" className="text-sm ">Link type</label>
                        <div id="link types" className='flex flex-col gap-2 p-2 border-[1px] border-slate-300 rounded-sm'>
                            <div className='flex gap-2 p-2 border-[1px] border-slate-400 rounded-sm'>
                                <input type="radio" id="icon_link" name="Icon link" value={URL_TYPE.ICON_LINK} checked={selectedLinkType === URL_TYPE.ICON_LINK} onChange={handleLinkTypeChange} />
                                <label className='w-full' htmlFor="icon_link">Other link</label>
                            </div>
                            <div className='flex gap-2 p-2 border-[1px] border-slate-400 rounded-sm'>
                                <input type="radio" id="social_link" name="Social link" value={URL_TYPE.SOCIAL_LINK} checked={selectedLinkType === URL_TYPE.SOCIAL_LINK} onChange={handleLinkTypeChange} />
                                <label className='w-full' htmlFor="social_link">Social link</label>
                            </div>
                            <div className='flex gap-2 p-2 border-[1px] border-slate-400 rounded-sm'>
                                <input type="radio" id="affiliate_link" name="Affiliate link" value={URL_TYPE.AFFILIATE_LINK} checked={selectedLinkType === URL_TYPE.AFFILIATE_LINK} onChange={handleLinkTypeChange} />
                                <label className='w-full' htmlFor="affiliate_link">Affiliate link</label>
                            </div>
                        </div>
                        {
                            selectedLinkType === 'AFFILIATE_LINK' ? <div className=''>
                                <div className='flex justify-between'>
                                    <label htmlFor="url_image" className="text-sm ">Image</label>
                                    {errors.image && <p className='text-red-400'>{errors.image}</p>}
                                </div>
                                <div className='flex gap-1 h-[40px] items-center justify-center border-[1px] border-slate-300'>
                                    {urlData?.image && <img className='h-full aspect-square' src={urlData?.image.url} />}
                                    <input
                                        id='url_image'
                                        className='bg-transparent rounded-sm w-full p-1'
                                        type="file"
                                        accept='image/*'
                                        onChange={onImageChangeHandler}
                                    />
                                </div>
                            </div>
                                :
                                <>
                                    <div className='flex justify-between'>
                                        <label htmlFor="icon" className="text-sm ">Icon</label>
                                        {errors.icon && <p className='text-red-400'>{errors.icon}</p>}
                                    </div>
                                    <div id='icon' ref={selectDivRef} className="relative w-full"
                                        tabIndex={0}
                                        aria-label='Select icon'
                                        onKeyDown={
                                            (e) => {
                                                if (e.key === 'Enter') {
                                                    setSelectMenu(!isSelectMenu);
                                                }
                                            }}>
                                        <button
                                            onClick={() => { setSelectMenu(!isSelectMenu) }}
                                            className="border-[1px] rounded-sm h-10 p-2 border-slate-300 w-full  flex items-center justify-between pl-3 pr-2 focus:outline-none">
                                            <span className="text-sm leading-none">
                                                {selectedIcon?.name ?
                                                    selectedIcon?.name
                                                    :
                                                    'select icon...'}
                                            </span>
                                            {
                                                isSelectMenu ?
                                                    <FontAwesomeIcon className=' ' icon='fas fa-chevron-up' />
                                                    :
                                                    <FontAwesomeIcon className=' ' icon='fas fa-chevron-down' />
                                            }
                                        </button>
                                        {
                                            isSelectMenu &&
                                            <div className="h-80 rounded-sm overflow-auto overscroll-none absolute flex flex-col w-full mt-1 bg-slate-50 z-20">
                                                <div onClick={() => onIconChangeHandler('select icon...', '')}
                                                    className={`flex items-center gap-3 px-4 py-1 hover:bg-slate-200 cursor-pointer text-black ${selectedIcon.icon === '' ? 'bg-white' : 'bg-slate-200'}`}>
                                                    <p>select icon...</p>
                                                </div>
                                                {
                                                    ICON_ARRAY?.map((item) => {
                                                        return <div key={item.name}
                                                            onClick={() => onIconChangeHandler(item.name, item.icon)}
                                                            onKeyDown={
                                                                (e) => {
                                                                    if (e.key === 'Enter') onIconChangeHandler(item.name, item.icon);
                                                                }}
                                                            tabIndex={0}
                                                            aria-selected={selectedIcon.icon === item.icon ? 'true' : 'false'}
                                                            className={`flex items-center gap-3 px-4 py-1 hover:bg-slate-200 cursor-pointer text-black ${selectedIcon.icon === item.icon ? 'bg-white' : 'bg-slate-50'}`}>
                                                            <FontAwesomeIcon className='w-6 h-6 text-gray-700' icon={item?.icon} />
                                                            <p>{item.name}</p>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>
                                </>
                        }
                    </div>
                    <div>
                        <div className='flex justify-between'>
                            <label htmlFor="title" className="text-sm ">Title</label>
                            {errors.title && <p className='text-red-400'>{errors.title}</p>}
                        </div>
                        <input
                            id='title'
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-slate-300 w-full'
                            placeholder="eg. Follow me on facebook"
                            type="text"
                            name="title"
                            value={inputValue.title}
                            required
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className='w-full'>
                        <p className='pb-2'>Select title/icon color</p>
                        <ColorPicker hideInput={["rgb", "hsv"]} color={color} onChange={setColor} />
                    </div>

                    <div>
                        <div className='flex justify-between'>
                            <label htmlFor="url" className="text-sm">Url</label>
                            {errors.url && <p className='text-red-400'>{errors.url}</p>}
                        </div>
                        <input
                            id='url'
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-slate-300 w-full '
                            placeholder="eg. www.example.com"
                            type="url"
                            name="url"
                            value={inputValue.url}
                            required
                            onChange={onChangeHandler}
                        />
                    </div>
                    <Button className='bg-slate-50 text-black hover:bg-black hover:text-white px-4 py-1 rounded-full transition-colors duration-300 shadow-md' onClick={submitHandler} label={`${type === 'ADD' ? 'Add' : 'Update'}`} />
                </div >
            </div>
        </div >
    )
}
export default UrlForm;