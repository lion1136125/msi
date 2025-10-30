document.addEventListener('DOMContentLoaded', ()=>{
  const form=document.getElementById('serviceForm');
  const pop=document.getElementById('submitSuccess');
  form?.addEventListener('submit', e=>{
    e.preventDefault();
    pop.style.display='block';
    setTimeout(()=>{pop.style.display='none'},5000);
    form.reset();
  });
  // Disable tel: on desktop
  const disable=()=>{
    if (window.matchMedia('(min-width: 960px)').matches){
      document.querySelectorAll('a[href^="tel:"]').forEach(a=>{
        a.addEventListener('click',e=>e.preventDefault(),{passive:false});
        a.style.cursor='default';
      });
    }
  };
  disable(); window.addEventListener('resize', disable);
});