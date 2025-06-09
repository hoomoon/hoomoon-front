import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'pt-BR', 'es', 'fr']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const savedLocale = request.cookies.get('NEXT_LOCALE')
  if (savedLocale && locales.includes(savedLocale.value)) {
    return savedLocale.value
  }

  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  try {
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    return match(languages, locales, defaultLocale)
  } catch (error) {
    return defaultLocale
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Verifica se o pathname já tem um locale válido
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Se já tem locale válido, continua
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Para qualquer outra rota, adiciona o locale detectado
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // Pula arquivos estáticos e API routes
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.).*)',
  ],
}