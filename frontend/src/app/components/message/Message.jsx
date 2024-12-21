import { useRef, useEffect } from 'react';
import { Transition } from 'react-transition-group';

function Message({ message }) {
    const messageRef = useRef(null);

    useEffect(() => {
        if (message?.length !== 0) {
            messageRef.current = message;
        }
    }, [message])

    return (
        <>
            {<Transition in={Boolean(message)} timeout={100}>
                {(state) => (
                    <div className={`w-[80%] max-w-5xl p-[10px] fixed left-0 right-0 z-20 mx-auto bg-[#c8fad7] text-black rounded-full shadow-lg text-center overflow-hidden transition-all transform ease-in-out duration-700 ${state === 'entered' ? 'bottom-6 ' : '-bottom-20'}`}>
                        {messageRef.current}
                    </div>
                )}
            </Transition >

            }
        </>

    )
}

export default Message;