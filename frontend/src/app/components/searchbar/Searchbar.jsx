import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { API_URL_PROFILE } from '../../constants'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/slices/messageSlice';

function Searchbar({ searchKeywordHandler, setIsInputHidden }) {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');
    const [debounced, setDebounced] = useState();
    const dispatch = useDispatch();

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    const handleSearch = async (keyword) => {
        const response = await axios
            .get(API_URL_PROFILE + 'keyword/' + keyword, { headers: { 'Content-Type': 'application/json', } });
        if (response.data.success === true) {
            setIsInputHidden(false)
            searchKeywordHandler(response.data.data)
        }
    }

    function debounce(func, delay) {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args)
            }, delay);
        };
    }

    useEffect(() => {
        setDebounced(() => debounce(handleSearch, 300))
    }, [])


    const inputHandler = (e) => {
        setValue(e.target.value);
        if (e.target.value !== '') {
            debounced(e.target.value);
        } else {
            searchKeywordHandler([])
        }
    }

    const onSearchHandler = () => {
        if (value.length < 5) {
            dispatch(setMessage('Username must be atleast 5 characters long'));
            setTimeout(() => {
                dispatch(setMessage(''));
            }, 2000);
            return;
        }
        if (value) {
            const originname = window.location.origin;
            window.open(originname + '/' + value, '_blank');
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            onSearchHandler()
        }
    };

    return (
        <>
            <div className='max-w-[250px] rounded-full border border-1 border-slate-500 pl-2 flex justify-center items-center'>
                <input className='py-1 px-2 w-full text-black bg-transparent border-none outline-none'
                    type="text"
                    name=""
                    placeholder="Search..."
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={inputHandler}
                    onKeyUp={onSubmitHandler}
                >
                </input>
                <button className='w-[20px] h-[20px] aspect-square rounded-full m-1 flex justify-center items-center cursor-pointer hover:bg-white'
                    onClick={onSearchHandler}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSearchHandler()
                        }
                    }}>
                    <FontAwesomeIcon icon={faArrowRight} className='text-black hover:text-black' />
                </button>
            </div>
        </>
    )
}

export default Searchbar;