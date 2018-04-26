! function () {
    var view = document.querySelector('.messageBoard')
    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view
            this.model = model

            this.messageList = this.view.querySelector('ol')
            this.form = this.view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            this.model.fetch().then((messages) => {
                let array = messages.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.textContent = `${item.name}: ${item.content}`
                    this.messageList.appendChild(li)
                })
            })
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                let name = this.form.querySelector('input[name=name]').value
                let content = this.form.querySelector('input[name=content]').value
                if (name === '') {
                    alert('姓名未填')
                } else if (content === '') {
                    alert('内容未填')
                } else {
                    this.model.save(name, content).then((object) => {
                        let li = document.createElement('li')
                        li.textContent = `${object.attributes.name}: ${object.attributes.content}`
                        this.messageList.appendChild(li)
                    }).then(() => {
                        this.form.querySelector('input[name=content]').value = ''
                    })
                }
            })
        }
    }
    var model = {
        init: function () {
            var APP_ID = 'Ha2veasjzrpgxBp7tG6lrIc2-gzGzoHsz';
            var APP_KEY = 'Bp2ivSrj15kL2AyHoGvMKQa0';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch: function () {
            var query = new AV.Query('message');
            return query.find()
        },
        save: function (name, content) {
            var Message = AV.Object.extend('message')
            var message = new Message()
            return message.save({
                name: name,
                content: content
            })
        }
    }
    controller.init(view, model)
}.call()