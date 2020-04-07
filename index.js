// 固定header
const headerEl = document.querySelector('header');
var isSticky = headerEl.classList.contains('sticky');

window.addEventListener('scroll', () => {
    let height = window.pageYOffset;
    if(height >= 600 && !isSticky){
        headerEl.classList.add('sticky');
        isSticky = !isSticky;
    }
    if(height < 600 && isSticky){
        headerEl.classList.remove('sticky');
        isSticky = !isSticky;
    }
})

// 轮播

const glide = new Glide('.glide', {
    type: 'slider',
    startAt: 0,
    autoplay: 4000,
    hoverPause: true,
});

const captionsEl = document.querySelectorAll('.slide-caption');

glide.on(['mount.after', 'run.after'],() => {
    let caption = captionsEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: 'linear',
        delay: anime.stagger(400, {start: 300}),
        translateY: [anime.stagger([40, 10]), 0]
    })
})

glide.on('run.before', () => {
    let captionArr =  document.querySelectorAll('.slide-caption >*');
    [].slice.call(captionArr).forEach((el) => {
        el.style.opacity = 0;
    })
})
// 获取的类数组对象不能使用forEach方法
glide.mount();


// 产品中心
const isotope = new Isotope('.cases', {
    layoutMode: 'fitRows',
    itemSelector: '.case-item',
})

const filterBtns = document.querySelector('.filter-btns');

filterBtns.addEventListener('click', e => {
    let target = e.target;
    const filterOption = target.getAttribute('data-filter');
    let activeEl = document.querySelectorAll('.btn-active');
    [].slice.call(activeEl).forEach(el => {
        el.classList.remove('btn-active');
    })
    target.classList.add('btn-active');

    isotope.arrange({filter: filterOption})
})

// 固定scrollToTop
const scrollToTop = document.querySelector('.to-top');

function fixedToTop(){
    if(window.pageYOffset >= 1500){
        scrollToTop.style.display = 'block';
    }
    else{
        scrollToTop.style.display = 'none';
    }
}
window.addEventListener('scroll', fixedToTop)


// service-item动画
ScrollReveal().reveal('.service-item', {
    distance: '50px',
    duration: 500,
    easing: 'ease-in-out',
    origin: 'bottom', 
    interval: 350
});

const dataSectionEl = document.querySelector('.commpany');

// commpany-data从零开始
ScrollReveal().reveal('.commpany-data', {
    beforeReveal: () => {
        anime({
            targets: '.data-piece .num',
            innerHTML: el => {
                return [0, el.innerHTML]
            },
            duration: 3000,
            round: 1,
            easing: 'easeInExpo'
        });
        dataSectionEl.style.backgroundPosition = 'center center';
    }
})

// commpany动画
window.addEventListener('scroll', () => {
    // getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
    let bottom = dataSectionEl.getBoundingClientRect().bottom;
    let top = dataSectionEl.getBoundingClientRect().top;
    if(bottom >= 0 && top <= window.innerHeight){
        dataSectionEl.style.backgroundPositionY = bottom/3 + 'px';
    }
})

// 第一次跳转偏移有错？？？？
const scroll = new SmoothScroll('nav a[href*="#"], .to-top a[href*="#"]', {
    offset: 80,
});

const burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
    headerEl.classList.toggle('open');
})

