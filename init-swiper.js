! function () {
    var view = document.querySelector('#portfolio')
    var controller = {
        view: null,
        swiper: null,
        swiperOptions: {
            direction: 'horizontal',
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        },
        init: function(view){
            this.view=view
            this.initSwiper()
        },
        initSwiper: function(){
            this.swiper=new Swiper('.swiper-container',this.swiperOptions)
        }
    }
    controller.init.call(controller,view)
}.call()