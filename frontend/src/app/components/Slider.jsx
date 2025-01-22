import React, { useEffect, useRef } from 'react';

function Slider({ children, speed, className }) {
    let originalCardsPos = 0;
    let duplicateCardsPos = 0;
    const copyOfSpeed = speed; // in pixels per second (rate of movement)
    let startTimestamp; // timestamp of the first frame after the page is loaded

    const originalCardsRef = useRef(null);
    const duplicateCardsRef = useRef(null);

    function transition(currentTimestamp) {

        if (startTimestamp === undefined) {
            startTimestamp = currentTimestamp; // currentTimestamp - represents the current time (in milliseconds) since the first frame loaded.
        }

        const deltaTime = (currentTimestamp - startTimestamp) / 1000; // time taken to complete one frame
        startTimestamp = currentTimestamp;

        const pixelsTomove = speed * deltaTime;

        /* 
            Using window.requestAnimationFrame might sometimes result in animation inconistencies.
            For example, in deferent devices, depending on refresh rate the animation speed will vary.
            To counter that we need to ensure that the animation adapts to such variations.
            window.requestAnimationFrame provides parameter that represents the current time (in milliseconds) since the first frame loaded.
            Which we can use to find time taken to complete one frame. 
            Which when multiplied by the rate of movement(speed) gives us pixels to move.
        */

        if (originalCardsRef.current && duplicateCardsRef.current) {
            const cardsWidth = originalCardsRef.current.offsetWidth;

            originalCardsPos = originalCardsPos - pixelsTomove;
            duplicateCardsPos = duplicateCardsPos - pixelsTomove;

            originalCardsRef.current.style.transform = `translateX(${originalCardsPos}px)`;
            duplicateCardsRef.current.style.transform = `translateX(${duplicateCardsPos}px)`;

            if (originalCardsPos <= -cardsWidth) {
                originalCardsPos = cardsWidth;
            }

            if (duplicateCardsPos <= -(cardsWidth * 2)) {
                duplicateCardsPos = 0;
            }

            window.requestAnimationFrame(transition);
        }
    };

    useEffect(() => {
        window.requestAnimationFrame(transition);
    }, []);

    function onHoverHandler(hover) {
        if (hover === true) {
            speed = speed / 2;
        } else {
            speed = copyOfSpeed;
        }
    }

    return <>
        <div className={`w-full flex ${className}`}
            onMouseOver={() => onHoverHandler(true)}
            onMouseLeave={() => onHoverHandler(false)}
        >
            <div ref={originalCardsRef} className='flex'>
                {children}
            </div>
            <div ref={duplicateCardsRef} className='flex'>
                {children}
            </div>
        </div>
    </>
}

export default Slider;