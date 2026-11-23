import Script from "next/script";
import WhatsAppTracker from "./WhatsAppTracker";
import ReferralTracker from "./ReferralTracker";

// GA4 is loaded in <head> by app/layout.tsx. Meta Pixel loads only when its ID
// is set in the environment. OWNER: decide whether a consent notice is needed before
// enabling these.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
// OpenAI Measurement Pixel (ChatGPT Ads conversions): loads only when its ID is set.
const OAI_PIXEL_ID = process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID;

export default function Analytics() {
  return (
    <>
      <WhatsAppTracker />
      <ReferralTracker />
      {OAI_PIXEL_ID && (
        <Script id="openai-pixel" strategy="afterInteractive">
          {`(function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var js=d.createElement(s);js.async=true;js.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(js,f)})(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:${JSON.stringify(OAI_PIXEL_ID)}});`}
        </Script>
      )}
      {PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(PIXEL_ID)});fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
