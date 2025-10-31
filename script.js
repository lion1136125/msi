// script.js — MSI 사이트 (폼 전송 + 클릭 추적 통합)
document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('serviceForm');
  const popup = document.getElementById('submitSuccess');

  // ---------- 공용: 추적/로깅 도우미 ----------
  const gaEvent = (name, params={}) => {
    try { if (typeof gtag === 'function') gtag('event', name, params); } catch(e){}
  };
  const sendTrack = (path, payload={}) => {
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      // Cloudflare Worker를 붙인 경우 /track/* 로 전송되어 레이트리밋/로그 처리됨
      if (!(navigator.sendBeacon && navigator.sendBeacon(`/track/${path}`, blob))) {
        fetch(`/track/${path}`, { method: 'POST', headers: { 'content-type':'application/json' }, body: JSON.stringify(payload), keepalive: true }).catch(()=>{});
      }
    } catch(e){}
  };

  // ---------- 폼 전송 ----------
  async function sendMail(data) {
    const url = "https://formsubmit.co/ajax/noteservice@outlook.kr";
    const payload = {
      ...data,
      _subject: "MSI 접수 요청",
      _template: "table",
      _captcha: "false"
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("메일 전송 실패");
    return res.json();
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      "성함":        document.getElementById('custName')?.value?.trim() || "",
      "연락처":      document.getElementById('custPhone')?.value?.trim() || "",
      "지역/주소":   document.getElementById('custArea')?.value?.trim() || "",
      "고장 증상":   document.getElementById('issueType')?.value || "",
      "상세 설명":   document.getElementById('issueDetail')?.value?.trim() || ""
    };

    try {
      await sendMail(data);
      gaEvent('form_submit', { form_id: 'serviceForm' });
      sendTrack('form', { ok: true, ts: Date.now() });

      if (popup) { popup.style.display = 'block'; setTimeout(()=> popup.style.display='none', 5000); }
      form.reset();
    } catch (err) {
      gaEvent('exception', { description: 'form_submit_failed', fatal: false });
      sendTrack('form', { ok: false, ts: Date.now() });

      alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      console.error(err);
    }
  });

  // ---------- 전화/카카오 클릭 추적 ----------
  const telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]'));
  telLinks.forEach(a => {
    a.addEventListener('click', () => {
      const label = a.dataset.label || 'tel-link';
      gaEvent('click', { event_category: 'tel', event_label: label });
      sendTrack('tel', { where: label, ts: Date.now() });
    }, { passive: true });
  });

  const kakaoLinks = Array.from(document.querySelectorAll('a[href*="open.kakao"]'));
  kakaoLinks.forEach(a => {
    a.addEventListener('click', () => {
      gaEvent('click', { event_category: 'kakao', event_label: 'openchat' });
      sendTrack('kakao', { ts: Date.now() });
    }, { passive: true });
  });

  // ---------- 데스크톱에서 tel: 비활성 (원본 로직 유지) ----------
  const disable = () => {
    if (window.matchMedia('(min-width: 960px)').matches){
      document.querySelectorAll('a[href^="tel:"]').forEach(a=>{
        a.addEventListener('click', e=>e.preventDefault(), { passive:false });
        a.style.cursor='default';
      });
    }
  };
  disable();
  window.addEventListener('resize', disable);
});
