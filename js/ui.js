"use strict"

document.body.addEventListener("input", e => {
   const targetElement = e.target;
   // debugger;
   if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (targetElement.value) {
         targetElement.classList.add('has-data');
      } else {
         targetElement.classList.remove('has-data');
      }
   }
})

// по клику по бургеру переключать наличие класса
const el = document.querySelector('.header__burger');
el.addEventListener('click', (e) => {
   document.querySelector('.header__menu').classList.toggle('pressed');
   document.querySelector('.header__burger').classList.toggle('pressed');
   document.querySelector('body').classList.toggle('lock');
})

// повешать событие на кнопку
const elDishes = document.querySelectorAll('.body-dishes__bottom');
if (elDishes.length) {
   elDishes.forEach(dish => {
      const btn = dish.querySelector('.bottom-dishes__btn');
      btn.addEventListener("click", (e) => {
         dish.querySelector('.bottom-dishes__btn').classList.toggle('btn_gray');
         dish.querySelector('.bottom-dishes__rating').classList.toggle('rating_gray');
         const disabled = Boolean(dish.querySelector('.rating_gray'));
         const inputs = dish.querySelectorAll('.rating__item');
         if (inputs.length) {
            inputs.forEach(input => {
               if (disabled) {
                  input.setAttribute('disabled', disabled);
               }
               else {
                  input.removeAttribute('disabled')
               }
            })
         }
      })
   })
}

//SLIDERS
if ($('.slider-about').length > 0) {
   $('.slider-about').slick({
      // autoplay: true,
      // infinite: false,
      dots: false,
      arrows: true,
      accessibility: false,
      slidesToShow: 2,
      autoplaySpeed: 3000,
      // adaptiveHeight: true,
      nextArrow: '<button type="button" class="slick-next"></button>',
      prevArrow: '<button type="button" class="slick-prev"></button>',
      lazyLoad: 'ondemand',
      slidesToScroll: 1,
      responsive: [{
         breakpoint: 768,
         settings: {
            slidesToShow: 1
         }
      }]
   })
}

const ratings = document.querySelectorAll('.rating');

if (ratings.length > 0) {
   initRatings();
}

// Основная ф-ция 
function initRatings() {
   let ratingActive, ratingValue;
   // пробежаться по всем рейтингам
   for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating)
   }

   //инициализация конкретного рейтинга
   function initRating(rating) {
      initRatingVars(rating);

      if (rating.classList.contains('rating_set')) {
         setRating(rating);
      }

      setRatingActiveWidth()
   }

   // инициализация переменных
   function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
   }

   //  изменение ширины активных звезд
   function setRatingActiveWidth(index = ratingValue.innerHTML) {
      // index - используется в событии при наведении мыши на звезду
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`
   }

   // возможность указать оценку
   function setRating(rating) {
      const ratingItems = rating.querySelectorAll('.rating__item');
      for (let index = 0; index < ratingItems.length; index++) {
         const ratingItem = ratingItems[index];
         ratingItem.addEventListener("mouseenter", function (e) {
            initRatingVars(rating);
            setRatingActiveWidth(ratingItem.value);
         });
         ratingItem.addEventListener("mouseleave", function (e) {
            setRatingActiveWidth();
         });
         ratingItem.addEventListener("click", function (e) {
            initRatingVars(rating);

            if (rating.dataset.ajax) {
               // send to server
               setRatingValue(ratingItem.value, rating);
            } else {
               // Отобразить указанную оценку
               ratingValue.innerHTML = index + 1;
               setRatingActiveWidth();
            }
         })
      }
   }
}