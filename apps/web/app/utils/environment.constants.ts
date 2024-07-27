export const isProd = process.env.NODE_ENV === 'production'

// for preview
export const REDIRECT_URL = isProd ? 'https://vuefes.jp/2024' : 'https://localhost:3000'
