import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host === "openstudio.gl" || host === "www.openstudio.gl") {
    const url = request.nextUrl.clone();

    if (!url.pathname.startsWith("/openstudio")) {
      url.pathname = `/openstudio${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)"],
};
