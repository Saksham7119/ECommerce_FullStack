import React from 'react'

export const Backdrop = ({data}) => {
  return (
    <div
        className={`z-20 transition-all duration-200 opacity-60 w-screen h-screen bg-slate-500 fixed ${data ?"top-16" :" top-0" } left-0 `}
    ></div>
  )
}
