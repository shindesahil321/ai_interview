import React, { ReactNode } from 'react'

function Rootlayout({children}:{children:ReactNode}) {
  return (
    <div className="auth-layout">
      {children}
    </div>
  )
}

export default Rootlayout
