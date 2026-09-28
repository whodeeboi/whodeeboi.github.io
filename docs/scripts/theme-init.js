(() => { try { const saved=localStorage.getItem('jehu-theme'); if(saved==='light'||saved==='dark') document.documentElement.dataset.theme=saved; } catch {} })();
