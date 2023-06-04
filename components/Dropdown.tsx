import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Drowndown({ trigger, children, closeOnClick, dropdownClasses = 'right-0' }: any) {

  const [isOpen, setIsOpen] = useState(false);
  const itemsRef = useRef(null);
  const toggle = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleKeyUp = (event: any) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keyup', handleKeyUp)
    }

    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [isOpen])

  const handleChildrenClick = () => {
    if(closeOnClick) {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <button onClick={toggle} className="relative z-10">
        { trigger }
      </button>
      
      <CSSTransition nodeRef={ itemsRef } in={ isOpen } timeout={ 2000 } classNames="my-node" unmountOnExit>
        <div ref={ itemsRef } className="z-50">
          <button onClick={ toggle } tabIndex={-1} className="fixed inset-0 h-full w-full cursor-default"></button>
          <div onClick={ handleChildrenClick } className={ `absolute mt-2 py-2 w-auto min-w-[164px] bg-gray-100 rounded-lg shadow-xl text-gray-800 p-2 z-50 ${ dropdownClasses}` }>
            { children }
          </div>
        </div>
        
      </CSSTransition>
    </div>
  )
}