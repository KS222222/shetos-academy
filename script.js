(function(){
 var $=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
 var loader=document.getElementById('loader'),nm=document.getElementById('nm');
 var calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 function hide(){loader.style.display='none'}
 document.getElementById('f').addEventListener('submit',function(e){
  e.preventDefault();var d=new FormData(e.target);
  var m='أهلاً Shetos Academy\nالاسم: '+d.get('n')+'\nالتليفون: '+d.get('p')+'\nسن اللاعب: '+(d.get('a')||'-')+'\nالمجموعة: '+(d.get('g')||'-')+'\n'+(d.get('m')||'');
  document.getElementById('ok').style.display='block';
  window.open('https://wa.me/201221194025?text='+encodeURIComponent(m),'_blank');
 });
 var hv=document.querySelector('.hero video');if(hv&&'IntersectionObserver' in window)new IntersectionObserver(function(e){e[0].isIntersecting?hv.play().catch(function(){}):hv.pause()},{threshold:.05}).observe(hv);
 var nav=document.getElementById('nav');
 addEventListener('scroll',function(){nav.classList.toggle('solid',scrollY>60)},{passive:true});
 if(!window.gsap||!window.ScrollTrigger||calm){setTimeout(hide,calm?200:2200);return}

 gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
 'SHETOS'.split('').forEach(function(c){var s=document.createElement('span');s.textContent=c;nm.appendChild(s)});
 $('[data-s]').forEach(function(el){var t=el.textContent;el.textContent='';t.split('').forEach(function(c){var s=document.createElement('span');s.className='ch';s.textContent=c;el.appendChild(s)})});
 var st=document.getElementById('st');st.innerHTML=st.textContent.split(' ').map(function(w,i,a){return '<span class="wd">'+w+'</span>'}).join(' ');

 var lenis;
 if(window.Lenis){lenis=new Lenis({lerp:.09});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);
  $('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();lenis.scrollTo(t,{offset:-60})}})})}

 // loader -> hero intro
 gsap.set('#nm span',{yPercent:110});gsap.set('.ac',{opacity:0});gsap.set('h1 .ch',{yPercent:115});gsap.set(['.tag','.btns','nav'],{opacity:0,y:30});
 gsap.timeline()
  .to('#nm span',{yPercent:0,stagger:.09,duration:.7,ease:'power4.out'})
  .to('.ac',{opacity:1,duration:.5},.5)
  .to(loader,{yPercent:-100,duration:1,ease:'power4.inOut',onComplete:hide},'+=.6')
  .to('h1 .ch',{yPercent:0,stagger:.05,duration:.9,ease:'power4.out'},'-=.5')
  .to(['.tag','.btns','nav'],{opacity:1,y:0,stagger:.15,duration:.8,ease:'power3.out'},'-=.6');

 // progress + hero parallax
 gsap.to('#pg',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.3}});
 gsap.to('.hero .in',{yPercent:-12,opacity:.2,ease:'none',scrollTrigger:{trigger:'.hero',start:'center top',end:'bottom top',scrub:true}});

 // marquee reacts to scroll velocity
 var mq=gsap.to('#mq',{xPercent:-50,duration:22,ease:'none',repeat:-1});
 ScrollTrigger.create({onUpdate:function(s){gsap.to(mq,{timeScale:1+Math.min(Math.abs(s.getVelocity())/350,5),duration:.3,overwrite:true})}});

 // statement fills word by word
 gsap.fromTo('.wd',{opacity:.15},{opacity:1,stagger:.25,ease:'none',scrollTrigger:{trigger:'.state',start:'top 70%',end:'center 40%',scrub:true}});
 gsap.to('.wd:nth-last-child(-n+3)',{color:'#8DF5C2',scrollTrigger:{trigger:'.state',start:'center 60%',toggleActions:'play none none reverse'}});

 // reveals (above gallery)
 function reveal(sel){gsap.set(sel,{opacity:0,y:50});ScrollTrigger.batch(sel,{start:'top 90%',once:true,onEnter:function(b){gsap.to(b,{opacity:1,y:0,stagger:.12,duration:.9,ease:'power3.out',overwrite:true})}})}
 reveal('.pil div,.card,.steps div,.ph');
 // horizontal gallery (desktop only)
 var mm=gsap.matchMedia();
 mm.add('(min-width:821px)',function(){
  var tr=document.querySelector('.track');
  gsap.to(tr,{x:function(){return tr.offsetWidth-innerWidth},ease:'none',scrollTrigger:{trigger:'.hs',pin:true,scrub:.6,anticipatePin:1,start:'top top',end:function(){return '+='+(tr.offsetWidth-innerWidth)},invalidateOnRefresh:true}});
 });
 // reveals (below gallery)
 reveal('.fcard,details,.cinfo,form');
 gsap.to('.ph img.m',{yPercent:-6,ease:'none',scrollTrigger:{trigger:'.ph',scrub:true}});


 // tilt cards + magnetic buttons + cursor
 if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  $('.card').forEach(function(c){
   c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to(c,{rotationY:x*14,rotationX:-y*14,duration:.4})});
   c.addEventListener('mouseleave',function(){gsap.to(c,{rotationX:0,rotationY:0,duration:.6})})});
  $('.btn,.call').forEach(function(b){
   b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.35,duration:.3})});
   b.addEventListener('mouseleave',function(){gsap.to(b,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'})})});
 }
 var rf=function(){ScrollTrigger.refresh()};addEventListener('load',rf);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(rf);setTimeout(rf,1500);setTimeout(rf,3500);
})();