import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { upload_gallery_image } from '../../../store/slices/galleryImageSlice';
import Button from '../../../components/button/Button';
import "react-color-palette/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons';

function ImageForm({ setShowMenu }) {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null);

    const [inputValue, setInputValue] = useState({
        'description': '',
    });

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

    const submitHandler = () => {

        let newErrors = {};

        if (inputValue?.description?.length < 1) {
            newErrors.description = 'required';
        }

        if (inputValue?.description?.length < 6) {
            newErrors.description = 'must be 6 characters';
        }

        if (!image) {
            newErrors.image = 'required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const body = { ...inputValue, image }

        dispatch(upload_gallery_image(body))

        setShowMenu(false);
    }

    return (
        <div className='z-40 fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center'>
            <div className='relative max-w-2xl w-full m-4 bg-white text-black border-[1px] border-slate-300 rounded-lg overflow-clip'>
                <div className='p-2 px-4 sticky top-0 flex justify-between items-center bg-slate-50'>
                    <p className='font-bold'>Add Image</p>
                    <button onClick={() => setShowMenu(false)} className='w-[34px] aspect-square text-black border-slate-300 rounded-full border-[1px] hover:bg-slate-100 hover:text-black hover:border-black'>
                        <FontAwesomeIcon icon={faClose} size={'lg'} />
                    </button>
                </div>
                <div className='relative w-full px-4 pt-2 pb-6  max-h-[80svh] h-full overflow-auto overscroll-contain flex flex-col gap-2'>
                    <div className=''>
                        <div className=''>
                            <div className='flex justify-between'>
                                <label htmlFor="gallery_image" className="text-sm ">Image</label>
                                {errors.image && <p className='text-red-400'>{errors.image}</p>}
                            </div>
                            <div className='flex gap-1 h-[40px] items-center justify-center border-[1px] border-slate-300'>
                                <input
                                    id='gallery_image'
                                    className='bg-transparent rounded-sm w-full p-1'
                                    type="file"
                                    accept='image/*'
                                    onChange={onImageChangeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between'>
                            <label htmlFor="description" className="text-sm ">Description</label>
                            {errors.description && <p className='text-red-400'>{errors.description}</p>}
                        </div>
                        <input
                            id='description'
                            className='border-[1px] bg-transparent rounded-sm h-10 p-2 border-slate-300 w-full'
                            placeholder="describe image"
                            type="text"
                            name="description"
                            value={inputValue.description}
                            required
                            onChange={onChangeHandler}
                        />
                    </div>
                    <Button className='bg-slate-50 text-black hover:bg-black hover:text-white px-4 py-1 rounded-full transition-colors duration-300 shadow-md' onClick={submitHandler} label='Add image' />
                </div >
            </div>
        </div >
    )
}
export default ImageForm;