import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { clearMessage, setMessage } from '../../../store/slices/messageSlice';
import Button from '../../../components/button/Button';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICON_ARRAY } from '../../../constants';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function UrlForm({ type, urlData, setShowMenu, onSubmit }) {

    const dispatch = useDispatch();

    const selectDivRef = useRef(null);
    const [color, setColor] = useColor(urlData?.color || '#ffffff');
    const [isSelectMenu, setSelectMenu] = useState(false);

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
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        })
    }

    const submitHandler = () => {
        let flag = '';
        if (inputValue?.title?.length < 1) {
            flag = 'Title';
        }
        if (inputValue?.url?.length < 1) {
            flag = 'URL';
        }
        if (flag !== '') {
            dispatch(setMessage(flag + ' must not be empty!'))
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
            return;
        }

        const body = { ...inputValue, icon: selectedIcon?.icon, color: color?.hex }
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
        <div className='z-40 fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-full m-4'>
                <div className='relative w-full max-w-2xl m-auto h-full flex flex-col p-6 gap-4 text-white border-[1px] border-slate-700 rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <p className='font-bold'>{`${type === 'ADD' ? 'Add Url' : "Edit Url"}`}</p>
                        <button onClick={() => setShowMenu(false)} className='w-[34px] aspect-square bg-white text-black rounded-full border-[1px] border-transparent hover:bg-transparent hover:text-white hover:border-white'>
                            <FontAwesomeIcon icon={faClose} size={'lg'} />
                        </button>
                    </div>
                    <div>
                        <label htmlFor="icon" className="text-sm text-slate-300">Icon</label>
                        <div id='icon' ref={selectDivRef} className="relative w-full bg-[#040C18]"
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
                                className="border-[1px] bg-[#040C18] rounded-sm h-10 p-2 border-white w-full  flex items-center justify-between pl-3 pr-2 focus:outline-none">
                                <span className="text-sm leading-none">
                                    {selectedIcon?.name ?
                                        selectedIcon?.name
                                        :
                                        'select icon...'}
                                </span>
                                {
                                    isSelectMenu ?
                                        <FontAwesomeIcon className=' text-white' icon='fas fa-chevron-up' />
                                        :
                                        <FontAwesomeIcon className=' text-white' icon='fas fa-chevron-down' />
                                }
                            </button>
                            {
                                isSelectMenu &&
                                <div className="h-80 rounded-sm overflow-auto overscroll-none absolute flex flex-col w-full mt-1 bg-[#040C18] z-20">
                                    <div onClick={
                                        () => {
                                            setSelectedIcon({
                                                name: 'select icon...',
                                                icon: '',
                                            });
                                            setSelectMenu(false)
                                        }}
                                        className={`flex items-center gap-3 px-4 py-1 hover:bg-gray-900 cursor-pointer  ${selectedIcon.icon === '' ? 'bg-gray-900' : 'bg-slate-950'}`}>
                                        <p>select icon...</p>
                                    </div>
                                    {
                                        ICON_ARRAY?.map((item) => {
                                            return <div key={item.name}
                                                onClick={
                                                    () => {
                                                        setSelectedIcon({
                                                            name: item.name,
                                                            icon: item.icon,
                                                        });
                                                        setSelectMenu(false)
                                                    }}
                                                onKeyDown={
                                                    (e) => {
                                                        if (e.key === 'Enter') {
                                                            setSelectedIcon({
                                                                name: item.name,
                                                                icon: item.icon,
                                                            });
                                                            setSelectMenu(false);
                                                        }
                                                    }}
                                                tabIndex={0}
                                                aria-selected={selectedIcon.icon === item.icon ? 'true' : 'false'}
                                                className={`flex items-center gap-3 px-4 py-1 hover:bg-gray-800 cursor-pointer  ${selectedIcon.icon === item.icon ? 'bg-gray-800' : 'bg-slate-950'}`}>
                                                <FontAwesomeIcon className='w-6 h-6 text-white' icon={item?.icon} />
                                                <p>{item.name}</p>
                                            </div>
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <label htmlFor="title" className="text-sm text-slate-300">Title</label>
                        <input
                            id='title'
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-white w-full '
                            placeholder="eg. Follow me on facebook"
                            type="title"
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
                        <label htmlFor="url" className="text-sm text-slate-300">Url</label>
                        <input
                            id='url'
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-white w-full '
                            placeholder="eg. www.example.com"
                            type="url"
                            name="url"
                            value={inputValue.url}
                            required
                            onChange={onChangeHandler}
                        />
                    </div>
                    <Button className='text-white border border-white hover:bg-white hover:text-black px-4 py-1 rounded-full transition-colors duration-300' onClick={submitHandler} label={`${type === 'ADD' ? 'Add' : 'Update'}`} />
                </div >
            </div>
        </div >
    )
}
export default UrlForm;