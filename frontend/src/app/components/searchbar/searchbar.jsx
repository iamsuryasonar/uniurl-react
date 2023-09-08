import { useNavigate } from 'react-router-dom';
import s from './searchbar.module.css'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Searchbar() {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('')

    const navigate = useNavigate();

    const handleInputFocus = (e) => {
        setIsFocused(true);
    };
    const handleInputBlur = () => {
        setIsFocused(false);
    };


    const inputHandler = (e) => {
        setValue(e.target.value);
    }


    const onSearchHandler = () => {
        if (value.length < 5) return;
        if (value) {
            const originname = window.location.origin;
            window.location.replace(originname + '/' + value);
        }
    }

    const onSubmitHandler = (e) => {
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
                    placeholder="Type to search"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={inputHandler}
                    onKeyUp={onSubmitHandler}
                >
                </input>
                <div className={s.search_btn} onClick={onSearchHandler} >
                    <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' className={s.search_icon} />
                </div>
            </div>
        </>
    )
}

export default Searchbar;