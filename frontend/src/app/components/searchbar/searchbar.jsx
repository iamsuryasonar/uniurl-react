import { useNavigate } from 'react-router-dom';
import s from './searchbar.module.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Searchbar() {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('')

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