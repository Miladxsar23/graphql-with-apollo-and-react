import * as React from 'react'
import './index.scss'
function Spinner() {
    return (
        <div className='d-block p-2 w-100 Spinner'>
            <div className='Spinner-indicator mx-auto'></div>
        </div>
    )
}


export default React.memo(Spinner)