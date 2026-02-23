/**
 * Cloudflare Pages Function — OAuth 콜백 리다이렉트
 *
 * GoTrue가 Site URL (toyou.launchlane.io?code=xxx)로 폴백 리다이렉트할 때,
 * 서버 사이드에서 HTTP 302로 앱 딥링크(toyou:///auth/callback)로 리다이렉트한다.
 *
 * ASWebAuthenticationSession(iOS) / Chrome Custom Tabs(Android)는
 * HTTP 302 redirect의 커스텀 스킴을 감지하여 openAuthSessionAsync에 URL을 반환한다.
 * (JavaScript window.location.replace()는 감지하지 못함)
 */
export function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.searchParams.has('code') || url.searchParams.has('error')) {
    const target = 'toyou://auth/callback' + url.search;
    return new Response(null, {
      status: 302,
      headers: { 'Location': target },
    });
  }

  // OAuth 콜백이 아닌 일반 방문 → 정적 index.html 서빙
  return context.next();
}
