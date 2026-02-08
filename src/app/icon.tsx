import { ImageResponse } from 'next/og'
 
export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
            style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px', 
                background: 'linear-gradient(to bottom right, #7c3aed, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: '16px',
                fontFamily: 'sans-serif'
            }}
        >
            AP
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
