export const isProd = process.env.NODE_ENV === 'production'

export const REDIRECT_URL = isProd ? 'https://vuefes.jp/2024' : 'https://localhost:3000'
