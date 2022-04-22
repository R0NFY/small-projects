// breaking the h1 into spans

const fc = document.querySelector('h1 > .fc')
const sc = document.querySelector('h1 > .sc')

const fcText = fc.textContent.split('')
const scText = sc.textContent.split('')

let fcResult = ''
let scResult = ''

fcText.forEach(function(char){
    fcResult += char.trim() === '' ? ' ' : "<span>" + char + "</span>"
});

scText.forEach(function(char){
    scResult += char.trim() === '' ? ' ' : "<span>" + char + "</span>"
});
  
fc.innerHTML = fcResult + '<br>';  
sc.innerHTML = scResult;  

// animation 

gsap.registerPlugin(ScrollTrigger)

gsap.to('h1 > .fc > span', {
    scrollTrigger: {
        trigger: 'h1',
        scrub: 3,
        start: '-128 top', 
        end: '800% 70%',
    },
    yPercent: -500,
    stagger: {
        each: 0.005,
        from: 'end',
        ease: Power2.easeOut
    }
})

gsap.to('h1 > .sc > span', {
    scrollTrigger: {
        trigger: 'h1',
        scrub: 3,
        start: '-128 top', 
        end: '800% 70%',
    },
    yPercent: -700,
    stagger: {
        each: 0.005,
        from: 'end',
        ease: Power2.easeOut
    }
})

gsap.to('h1', {
    scrollTrigger: {
        trigger: 'h1',
        scrub: 3,
        start: '-128 top', 
        end: '800% 70%',
    },
    ease: Power2.easeOut,
    yPercent: -200,
})

gsap.to('img', {
    scrollTrigger: {
        trigger: 'img', 
        scrub: 3,
        start: 'top 70%', 
        end: '1400% 100%',
    }, 
    width: '100%', 
    height: '100%',
    ease: Power2.easeOut,
    scaleX: 1,
    scaleY: 1, 
    x: 0, 
    y: 0
})