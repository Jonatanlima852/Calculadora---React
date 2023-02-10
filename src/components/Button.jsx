import React from 'react'
import './Button.css'


export default props => 
    <button 
    onClick={e => props.click && props.click(props.label)}  //Chama se estiver setada  função 
    className={`
        button
        ${props.operation ? 'operation' : ''}
        ${props.double ? 'double': ''}
        ${props.triple ? 'triple': ''}
    `}>
        {props.label}
    </button>

// ao colocar {} o código lá dentro é JS, então pode colocar template string