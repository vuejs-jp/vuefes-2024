export const isProd = process.env.NODE_ENV === 'production'

// for preview
export const REDIRECT_URL = isProd ? 'https://vuefes.jp/2024' : 'https://deploy-preview-233--vuefes-2024.netlify.app/2024'
