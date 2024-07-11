import { useState, useEffect } from 'react';
import classes from './SoftPhone.module.css';

const SoftPhone: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = useState(false);
    const [isDialWindow, setIsDialWindow] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        setIsMoving(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            });
            setIsMoving(true);
        }
    };

    const handleMouseUp = () => {
        if (isDialWindow) {
            setIsMoving(false);
        }
        setIsDragging(false);
    };


    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset]);

    const toggleDialWindow = () => {
        if (!isMoving) {
            setIsDialWindow(prev => !prev);
        }
    };

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Remove non-numeric characters from input
        const numericValue = event.target.value.replace(/\D/g, '');
        setPhoneNumber(numericValue);
    };

    const handleDialButtonClick = (number: string) => {
        setPhoneNumber(phoneNumber + number); // Append the clicked number to the phoneNumber
    };

    const clearPhoneNumber = () => {
        setPhoneNumber('');
    }

    return (
        <>
            <div
                className={`${classes.floatingButton} ${isDragging ? classes.dragging : ''}`}
                onMouseDown={handleMouseDown}
                onClick={toggleDialWindow}
                style={{ position: 'absolute', top: position.y, left: position.x }}
            >
                <svg className={classes.fabIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                    <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"></path>
                </svg>
            </div>
            <div className={classes.dialWindow} style={{ visibility: isDialWindow ? 'visible' : 'hidden', position: 'absolute', top: position.y - 100, left: position.x - 95 }}>
                <div className={classes.phoneHeader}>
                    <div className={classes.draggablePlace} onMouseDown={handleMouseDown}></div>
                    <button className={classes.closeButton} onClick={toggleDialWindow}>X</button>
                </div>
                <input value={phoneNumber} onChange={handlePhoneNumberChange} type='text' pattern='[0-9]*' className={classes.phoneNumber} />
                <button onClick={() => handleDialButtonClick('1')} className={classes.dialButton1}>1</button>
                <button onClick={() => handleDialButtonClick('2')} className={classes.dialButton2}>2</button>
                <button onClick={() => handleDialButtonClick('3')} className={classes.dialButton3}>3</button>
                <button onClick={() => handleDialButtonClick('4')} className={classes.dialButton4}>4</button>
                <button onClick={() => handleDialButtonClick('5')} className={classes.dialButton5}>5</button>
                <button onClick={() => handleDialButtonClick('6')} className={classes.dialButton6}>6</button>
                <button onClick={() => handleDialButtonClick('7')} className={classes.dialButton7}>7</button>
                <button onClick={() => handleDialButtonClick('8')} className={classes.dialButton8}>8</button>
                <button onClick={() => handleDialButtonClick('9')} className={classes.dialButton9}>9</button>
                <button onClick={() => handleDialButtonClick('*')} className={classes.dialButtonStar}>*</button>
                <button onClick={() => handleDialButtonClick('0')} className={classes.dialButton0}>0</button>
                <button onClick={() => handleDialButtonClick('#')} className={classes.dialButtonHash}>#</button>
                <button className={classes.clearButton} onClick={clearPhoneNumber}>Clear</button>
                <button className={classes.callButton}>Call</button>
            </div >
        </>
    );
};


export { SoftPhone };