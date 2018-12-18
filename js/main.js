//Модальное окно - гамбургер через JS

// $(function () {

//   let button = document.getElementById('burger-menu');
//   let tabletsMenu = document.getElementById('tablets-menu');
//   let body = document.body;

//   let buttonMenuFirst = document.getElementById('menu-list__item-first');
//   let buttonMenuSecond = document.getElementById('menu-list__item-second');
//   let buttonMenuThird = document.getElementById('menu-list__item-third');


//   var isOdd = true;

//   button.addEventListener('click', function () {

//     button.classList.toggle('burger-menu_active');
//     tabletsMenu.classList.toggle('tablets-menu_active');

//     if (isOdd) {
//       body.setAttribute("style", "overflow: hidden")
//       isOdd = false;
//     } else {
//       body.removeAttribute("style")
//       isOdd = true;
//     }

//   })

// })

//Модальное окно - гамбургер через плагин Fancybox

//fancybox

$(function(){
  $('[data-fancybox]').fancybox({
    touch: false,
    padding: 0,
    type: 'inline',
    maxWidth: 460,
    fitToView: true,
  })
  $('.tablets-menu__item').on('click', e =>{
    e.preventDefault();
    $.fancybox.close()
  })
})


//Вертикальный аккордеон "Команда"
$(function(){
  $('.team-acco__trigger').on('click touchstart', e =>{
    e.preventDefault();
    const $this = $(e.currentTarget);
    const item = $this.closest('.team-acco__item')
    const items = $this.closest('.team-acco')
    const container = items.find('.team-acco__item')

    if(!item.hasClass('team-acco__item_active')){
      container.removeClass('team-acco__item_active')
      item.addClass('team-acco__item_active')
    }else{
      item.removeClass('team-acco__item_active')
    }
    
  })

})


// Горизонтальный аккордеон "Меню"

$(function(){
    let flag = true;
    $('.menu-list__trigger').on('click touchstart', e =>{
        e.preventDefault();
        


        const calculateWidth = () =>{
          const wWidth = $(window).width();
          const titles = $('.menu-list__trigger');
          const titlesWidth = titles.width();
          const reqWidth = wWidth - (titlesWidth * titles.length);
          return(reqWidth > 550) ? 550 : reqWidth
          
        }
       
        




       const $this = $(e.currentTarget);
       const item = $this.closest('.menu-list__item');
       const container = item.closest('.menu-list')
       const items = container.find('.menu-list__item');
       const textBlock = container.find('.menu__container');
       const otherBlock = item.find('.menu__container');
       const reqWidth = calculateWidth();
       const textDesc = container.find('.menu__container-desc');
       const otherDesc = item.find('.menu__container-desc');
       textDesc.hide()

       if(!item.hasClass('menu-list__item-active')){
         items.removeClass('menu-list__item-active');
         item.addClass('menu-list__item-active')
         textBlock.animate({
           'width': '0px'
         })
         otherBlock.animate({
           'width': reqWidth+ 'px'
         },()=>{textDesc.fadeIn()} )
       }else{
         items.removeClass('menu-list__item-active')
         otherBlock.animate({
          'width': '0px'
        })
       }
        

        

        
      
        

        

      
        
        // const openItem = item =>{
        //   const container = $('.menu-list');
        //   const items = container.find('.menu-list__item');
        //   const accoText = container.find('.menu__container-desc');
        //   const activeItem = items.filter('.menu-list__item-active');
        //   const activeContent = activeItem.find('.menu__container');
        //   const content = item.find('.menu__container');
        //   const reqWidth = calculateWidth();

        //   items.removeClass('menu-list__item-active');
        //   item.addClass('menu-list__item-active');

        //   accoText.hide();
        //   activeContent.animate({
        //     'width' : '0px'
        //   })

        //   content.animate({
        //     'width': reqWidth  + 'px'
        //   }, ()=>{accoText.fadeIn() })

        // }

        // const $this = $(e.currentTarget);
        // const item = $this.closest('.menu-list__item')
        // const container = item.closest('.menu-list')
        // const items = container.find('.menu-list__item')
        // const content = item.find('.menu__container')
        // const textBlock = content.find('.menu__container-desc')
        
        // if(!item.hasClass('menu-list__item-active')){
        //   items.removeClass('menu-list__item-active');
        //   item.addClass('menu-list__item-active')
        // }else{
        //   item.removeClass('menu-list__item-active')
        // }

      })
    
    
})











//One Page Scroll 

$(function(){

  const display = $('.maincontent');
  const sections = $('.section');

  let inScroll = false; //убираем баг при быстрой прокрутке

  const mobileDetect = new MobileDetect(window.navigator.userAgent); //планин mobile-detect
  const isMobile = mobileDetect.mobile();



  //Событие на fixed menu 
  const switchMenuActiveClass = sectionEq =>{
    $('.menu-fixed__item').eq(sectionEq).addClass('menu-fixed__item_active')
      .siblings().removeClass('menu-fixed__item_active')
  }

  //Функция для смены секции
  const performTransition = sectionEq =>{
    
  
    if(inScroll == true) return 
    inScroll = true;
    const position = (sectionEq * -100) + '%'; //определяем позицию секции


    display.css({
          'transform': `translate(0, ${position})`,
          'webkit-transform' :  `translate(0, ${position})`
        })

    sections.eq(sectionEq).addClass('active')
      .siblings().removeClass('active');

    setTimeout(()=>{ //убираем баг при быстрой прокрутке
      inScroll = false;
      switchMenuActiveClass(sectionEq)
    }, 1300)
  }

  //Выносим в функцию часто используемые переменные
  const difineSections = sections =>{
    const activeSection = sections.filter('.active')
    return{
      activeSection: activeSection,
      nextSection: activeSection.next(),
      prevSection: activeSection.prev()
    }
  }

  const scrollToSection = direction=>{
    const section = difineSections(sections)

    if(inScroll)return;

    if(direction == 'up' && section.nextSection.length){ //вниз
      performTransition(section.nextSection.index())
    }
    if(direction == 'down' && section.prevSection.length){ // вверх
      performTransition(section.prevSection.index())
    }
  }




 //Управление колесом/тачпадом
  $('.wrapper').on({
    wheel: e =>{
      const deltaY = e.originalEvent.deltaY;
      let direction = (deltaY > 0) ? 'up' : 'down'

      scrollToSection(direction)
    }
    
    
  })

  //Управление с клавиатуры
  $(document).on('keydown', e=>{
    const section = difineSections(sections);


    if (inScroll) return

    switch(e.keyCode){
      case 40: //вверх
      if(!section.nextSection.length)return; //если секции есть, то код ниже выполнится
      performTransition(section.nextSection.index());
      break;

    case 38: //вниз
      if(!section.prevSection.length)return;
      performTransition(section.prevSection.index());
      break;

    }
  })
  //управление на телефонах
  if(isMobile){ //если isMobile содержит строку-информацию о браузере, значит мы с телефона и выполняется код для tablets/phones
    $(window).swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData){
          scrollToSection(direction)
        }
      })
  }
  






  //Навигация по кнопкам
  $('[data-scroll-to').on('click touchstart', e =>{
    e.preventDefault();
    const $this = $(e.currentTarget);
    //парсим строковое значение в числовое, так как  $this.attr('data-scroll-to' возвращает string)
    const sectionIndex = parseInt($this.attr('data-scroll-to'))
   
    performTransition(sectionIndex)
  })

})


//slider
$(function(){
  $(document).ready(function(){
   const burgerCarousel = $('.owl-carousel').owlCarousel({ 
      items: 1,
      nav: false,
      dots: false,
      navText: ['', ''],
      loop: true
    });
    
    $('.arrow__trigger_right').on('click', (e) =>{
      e.preventDefault();
      burgerCarousel.trigger('next.owl.carousel')
    } )
    $('.arrow__trigger_left').on('click', (e) =>{
      e.preventDefault();
      burgerCarousel.trigger('prev.owl.carousel')
    } )


  })
})

//maps
function initMap() {
  const opt = {
    center: {
      lat: 51.513416,
      lng: -0.129761
    },
    zoom: 4
  }
  const map = new.google.maps.Map(document.getElementById("#map"), opt)
}

