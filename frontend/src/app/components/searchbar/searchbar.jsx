import { useNavigate } from 'react-router-dom';
import s from './searchbar.module.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { API_URL_PROFILE } from '../../common/constants'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/slices/messageSlice'

function Searchbar({ searchKeywordHandler }) {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('')
    const [debounced, setDebounced] = useState();
    const dispatch = useDispatch();

    const handleInputFocus = (e) => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    const handleSearch = async (keyword) => {
        const response = await axios
            .get(API_URL_PROFILE + 'keyword/' + keyword, { headers: { 'Content-Type': 'application/json', } });
        if (response.data.success === true) {
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
        dispatch(setMessage())
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
            // Todo: implement error message notifier that pops out of nav bar and retreats back.
            // need to replace all error messages with this message ui.
            dispatch(setMessage('Username must be atleast 5 characters long'));
            return;
        }
        if (value) {
            const originname = window.location.origin;
            window.location.replace(originname + '/' + value);
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
            <div className={s.search}>
                <input className={s.search_txt}
                    type="text"
                    name=""
                    placeholder="Search..."
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={inputHandler}
                    onKeyUp={onSubmitHandler}
                >
                </input>
                <div className={s.search_btn} onClick={onSearchHandler} >
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={s.search_icon} />
                </div>
            </div>

        </>
    )
}

export default Searchbar;