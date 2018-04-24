! function () {
    var view = document.querySelectorAll('[data-x]')
    var controller = {
        view: null,
        init: function (view) {
            this.view = view
            for (let i = 0; i < this.view.length; i++) {
                this.view[i].classList.add('offset')
            }
            this.showIn()
            var liTags = document.querySelectorAll('.topNavBar nav>ul>li')
            for (let i = 0; i < liTags.length; i++) {
                liTags[i].onmouseenter = function (x) {
                    x.currentTarget.classList.add('active')
                }
                liTags[i].onmouseleave = function (x) {
                    x.currentTarget.classList.remove('active')
                }
            }
            this.bindEvents()
        },
        bindEvents: function () {
            window.addEventListener('scroll', (x) => {
                this.showIn()
            })
        },
        showIn: function () {
            let minindex = 0
            for (let i = 0; i < this.view.length; i++) {
                if (Math.abs(this.view[i].offsetTop - window.scrollY) < Math.abs(this.view[minindex].offsetTop -
                        window.scrollY)) {
                    minindex = i
                }
            }
            let id = this.view[minindex].id
            let a = document.querySelector('a[href="#' + id + '"]')
            let li = a.parentNode
            let brothersAndMe = li.parentNode.children
            for (let i = 0; i < brothersAndMe.length; i++) {
                brothersAndMe[i].classList.remove('highLight')
            }
            li.classList.add('highLight')
            this.view[minindex].classList.remove('offset')
        }
    }
    controller.init.call(controller, view)
}.call()