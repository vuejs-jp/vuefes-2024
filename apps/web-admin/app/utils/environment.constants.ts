export const isProd = process.env.NODE_ENV === 'production'

export const REDIRECT_URL = isProd ? 'https://vuefes-2024-admin.pages.dev' : 'https://localhost:3001'
