import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.6/mod.ts'

export default function handler(req: Request) {
  const params = new URLSearchParams(req.url.split('?')[1])

  const displayName = params.get('display_name') ?? ''
  const avatarUrl = params.get('avatar_url') ?? ''
  const role = params.get('role') ?? ''

  function backgroundColor(role: string) {
    if (role === 'staff') return 'rgb(42, 58, 75)' // 'color-mix(in srgb, #35495e, #000 20%)'
    if (role === 'speaker') return '#6e8f2e'
    if (role === 'sponsor') return '#e5af00'
    if (role === 'attendee') return '#cc4f39'
    if (role === 'attendee + party') return '#1a8191'
    return ''
  }

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '1200px',
          height: '630px',
          borderRadius: '20px',
          container: 'inline-size',
          overflow: 'hidden',
          // backgroundColor: 'color-mix(in srgb, #35495e, #000 20%)',
          backgroundColor: 'rgb(42, 58, 75)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: '30px',
            height: '34.88px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '14px',
            fontSize: '20px',
          }}
        >
          <img src="https://i.imgur.com/KErY9Pi.png" alt="Vue Fes Japan 2024" />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(to right, #42b883, #41b8aa)',
              border: '4px solid #fff',
              borderRadius: '50%',
              width: '120px',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              boxSizing: 'border-box',
              container: 'avatar / inline-size',
            }}
          >
            {avatarUrl ? (
              <img
                alt={displayName ?? ''}
                src={avatarUrl}
                width={120}
                height={120}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  boxShadow: '0px 0px 0px 2px rgba(255, 255, 255, 1)',          
                }}
                decoding="async"
              />
            ) : (
              <img
                src="https://i.imgur.com/wHa3m7V.png"
                alt=""
                width={120}
                height={120}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  boxShadow: '0px 0px 0px 2px rgba(255, 255, 255, 1)',
                }}
                decoding="async"
              />
            )}
          </div>
          <div
            style={{
              fontSize: '50px',
              fontWeight: 700,
              lineHeight: 1.1,
              marginTop: '20px',
              color: '#fff',
              overflowWrap: 'anywhere',
              wordBreak: 'break-all',
              overflowY: 'hidden',
            }}
          >
            {displayName}
          </div>
          <div
            style={{
              fontSize: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#fff',
              backgroundColor: backgroundColor(role ?? 'staff'),
              padding: '4px 40px',
              marginTop: '27px',
              borderRadius: '10px',
            }}
          >
            {role}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 1,
            right: 0,
            bottom: '20px',
            width: '220px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: '#fff',
            borderRadius: '5px 0 0 5px',
            boxShadow: 'inset -1px 0 0 0 #fff',
          }}
        >
          <img src="https://i.imgur.com/D8Cp7tB.png" alt="Supported by Stockmark" />
        </div>
        <img
          style={{
            position: 'absolute',
            zIndex: -1,
            left: 0,
            top: 0,
            verticalAlign: 'top',
            width: '100%',
          }}
          src="https://i.imgur.com/Klrh2iW.png"
          alt=""
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
