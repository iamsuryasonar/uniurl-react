import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { create_my_urls } from '../../store/slices/myUrlSlice';
import { clearMessage, setMessage } from '../../store/slices/messageSlice';
import Button from '../../components/Button/button';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ICON_ARRAY } from '../../common/constants';

function CreateUrl() {
    const dispatch = useDispatch();

    const selectDivRef = useRef(null);
    const [color, setColor] = useColor("#123123");
    const [isSelectMenu, setSelectMenu] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState({
        name: '',
        icon: ''
    });
    const [inputValue, setInputValue] = useState({
        'title': '',
        'url': '',
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

    const createUrlHandler = () => {
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

        dispatch(create_my_urls({ ...inputValue, icon: selectedIcon?.icon, color: color?.hex })).unwrap().then(() => {
            setInputValue({
                'title': '',
                'url': '',
            })
            setSelectedIcon({
                name: '',
                icon: ''
            });
        }).catch(() => {
        })
    }

    return (
        <div className=' w-full h-full flex flex-col px-2 py-14 gap-4 items-end'>
            <div ref={selectDivRef} className="relative w-full">
                <button onClick={() => { setSelectMenu(!isSelectMenu) }} className="border-[1px] bg-transparent rounded-sm h-10 p-2 border-black w-full  flex items-center justify-between pl-3 pr-2 focus:outline-none">
                    <span className="text-sm leading-none">
                        {selectedIcon?.name ? selectedIcon?.name : 'select icon...'}
                    </span>
                    <FontAwesomeIcon className=' text-black' icon='fas fa-chevron-down' />
                </button>
                {
                    isSelectMenu &&
                    <div className="h-80 rounded-sm overflow-auto overscroll-none absolute flex flex-col w-full mt-1 border border-black shadow-lg z-20">
                        <div onClick={
                            () => {
                                setSelectedIcon({
                                    name: 'select icon...',
                                    icon: '',
                                });
                                setSelectMenu(false)
                            }
                        } className={`flex items-center gap-3 px-4 py-1 hover:bg-gray-200 cursor-pointer  ${selectedIcon.icon === '' ? 'bg-gray-200' : 'bg-slate-50'}`}>
                            <p>select icon...</p>
                        </div>
                        {
                            ICON_ARRAY?.map((item) => {
                                return <div key={item.name} onClick={
                                    () => {
                                        setSelectedIcon({
                                            name: item.name,
                                            icon: item.icon,
                                        });
                                        setSelectMenu(false)
                                    }
                                } className={`flex items-center gap-3 px-4 py-1 hover:bg-gray-200 cursor-pointer  ${selectedIcon.icon === item.icon ? 'bg-gray-200' : 'bg-slate-50'}`}>
                                    <FontAwesomeIcon className='w-6 h-6 text-black' icon={item?.icon} />
                                    <p>{item.name}</p>
                                </div>
                            })
                        }
                    </div>
                }
            </div>

            <input
                className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-black w-full '
                placeholder="Title"
                type="title"
                name="title"
                value={inputValue.title}
                required
                onChange={onChangeHandler}
            />

            <div className='w-full'>
                <p className='pb-2'>Select title/icon color</p>
                <ColorPicker hideInput={["rgb", "hsv"]} color={color} onChange={setColor} />
            </div>

            <input
                className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-black w-full '
                placeholder="Url"
                type="url"
                name="url"
                value={inputValue.url}
                required
                onChange={onChangeHandler}
            />
            <Button className='text-white bg-black px-4 py-2' onClick={createUrlHandler} label='Create' />
        </div >
    )
}
export default CreateUrl;