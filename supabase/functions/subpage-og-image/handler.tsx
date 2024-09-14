import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.6/mod.ts'

const FONT_URL = 'https://jjdlwtezpdclgxxagxpj.supabase.co/storage/v1/object/public/common_asset/fonts/NotoSansCJKjp-Bold.otf'
const font = fetch(new URL(FONT_URL, import.meta.url)).then((res) => res.arrayBuffer())

export default async function handler(req: Request) {
  const params = new URLSearchParams(req.url.split('?')[1])

  const fontData = await font

  const title = params.get('title') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          background: 'url(https://i.imgur.com/kpZdYv8.png)',
          width: '100%',
          paddingTop: '107px',
          position: 'relative',
          textAlign: 'center',
          fontFamily: '\'din-2014\', \'游ゴシック体\', YuGothic, \'游ゴシック\', \'Yu Gothic\', sans-serif',
        }}
      >
        <div
          style={{
            color: '#35495e',
            fontSize: '80px',
            fontWeight: '900',
            position: 'absolute',
            top: '40%',
            left: '4px',
            maxHeight: '1.5em',
            justifyContent: 'center',
            margin: '10px 80px 0',
            overflow: 'hidden',
            lineHeight: '150%',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'noto-sans-cjk-jp',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  )
}
