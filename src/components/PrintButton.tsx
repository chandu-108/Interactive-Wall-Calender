"use client";

export function PrintButton() {
  const handlePrint = () => {
    const images = Array.from(document.images);
    const notLoaded = images.filter(img => !img.complete || img.naturalWidth === 0);

    const performPrint = () => {
      // Small delay so browser finishes rendering before opening print dialog
      setTimeout(() => window.print(), 150);
    };

    if (notLoaded.length === 0) {
      performPrint();
      return;
    }

    const timeoutId = setTimeout(() => {
      console.warn('Image loading timeout - printing anyway');
      performPrint();
    }, 8000);

    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded >= notLoaded.length) {
        clearTimeout(timeoutId);
        performPrint();
      }
    };

    notLoaded.forEach(img => {
      img.addEventListener('load', onLoad, { once: true });
      img.addEventListener('error', onLoad, { once: true });
    });
  };

  return (
    <button
      onClick={handlePrint}
      className="absolute bottom-4 right-4 z-50 p-2 rounded-full text-[#999] hover:text-[#444] dark:hover:text-[#E8E8E8] transition-colors print:hidden"
      aria-label="Print calendar"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    </button>
  );
}
