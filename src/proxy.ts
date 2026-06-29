import type { NextRequest } from 'next/server'

import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

const i18nMiddleware = createMiddleware(routing)

const rewritePathObj = rewritePath('/:locale/docs{/*path}', '/:locale/llms.mdx/docs{/*path}')

export default function proxy(request: NextRequest) {
  if (isMarkdownPreferred(request)) {
    const result = rewritePathObj.rewrite(request.nextUrl.pathname)

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl))
    }
  }

  return i18nMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|apple-touch-icon.png|favicon-96x96.png|favicon.svg|web-app-manifest-192x192.png|web-app-manifest-512x512.png|site.webmanifest|sitemap.xml|robots.txt).*)',
  ],
}
