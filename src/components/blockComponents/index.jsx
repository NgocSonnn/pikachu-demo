import React from 'react';
import './style.scss';

function BlockComponents({ block, handleClick }) {
    const { creatAt, pick, removed, img } = block;

    const handleClickBlock = () => {
        if (!pick && !removed) {
            handleClick(creatAt);
        }
    };

    return (
        <div
            className={`block-component ${pick ? 'pick-border' : 'pick-clear'} ${removed ? 'removed' : ''}`}
            onClick={handleClickBlock}>
            <img src={img} alt={`Block ${creatAt}`} className='block-component__img' />
        </div>
    );
}


export default BlockComponents;
