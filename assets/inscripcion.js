'use strict';
function googleFormURL(config) {
 let url;try{url=new URL(config?.url||'');}catch{return null;}
 return config?.open===true && url.protocol==='https:' && (url.hostname==='forms.gle'||(url.hostname==='docs.google.com'&&url.pathname.startsWith('/forms/'))) ? url : null;
}
function updateFutureLabRegistration(){
 document.querySelectorAll('[data-registration-course], [data-registration]').forEach(element=>{
  const code=element.dataset.registrationCourse||element.dataset.registration;
  const config=window.FUTURELAB_REGISTRATION?.[code];
  const url=googleFormURL(config);const closed=config?.status==='closed';
  const status=element.querySelector('[data-registration-status]');
  if(status) status.textContent=closed?'Inscripción cerrada':url?'Solicitudes de plaza abiertas':'Inscripción próximamente';
  const link=element.querySelector('[data-registration-link]');
  if(link){link.hidden=!url||closed;link.removeAttribute('href');if(url&&!closed)link.href=url.href;}
  const next=element.querySelector('[data-registration-next]');if(next)next.hidden=!url||closed;
  const explanation=element.querySelector('[data-registration-explanation]');
  if(explanation)explanation.textContent=closed?'El plazo de solicitud de este curso ha finalizado. Consulta las próximas convocatorias.':url?'Completa una única solicitud en Google Forms. Comprueba tus datos y el curso seleccionado antes de enviarla.':'Publicaremos el acceso al formulario cuando se abra la convocatoria. De momento no se reciben solicitudes.';
 });
 const section=document.querySelector('[data-registration]');
 if(section){const headerStatus=document.querySelector('[data-registration-header]');if(headerStatus)headerStatus.textContent=section.querySelector('[data-registration-status]').textContent;const url=googleFormURL(window.FUTURELAB_REGISTRATION?.[section.dataset.registration]);const closed=window.FUTURELAB_REGISTRATION?.[section.dataset.registration]?.status==='closed';document.querySelectorAll('a[href="#inscripcion"]').forEach(a=>a.textContent=url&&!closed?'Consultar condiciones e inscribirme':'Consultar inscripción');}
}
updateFutureLabRegistration();
