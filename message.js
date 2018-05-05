!function() {
  var view = View(".messageBoard");
  var model = Model({
    resourcename: "message"
  });
  var controller = Controller({
    init: function(view, model) {
      this.messageList = view.querySelector("ol");
      this.form = view.querySelector("form");
      this.loadMessages();
    },
    loadMessages: function() {
      this.model.fetch().then(messages => {
        let array = messages.map(item => item.attributes);
        let time = messages.map(item => item.createdAt);
        for (let i = 0; i < array.length; i++) {
          let li = document.createElement("li");
          li.textContent = `${array[i].name}: ${array[i].content}`;
          let span = document.createElement("span");
          span.textContent = this.GMTToStr(time[i]);
          li.appendChild(span);
          this.messageList.appendChild(li);
        }
        // array.forEach(item => {
        //   let li = document.createElement("li");
        //   li.textContent = `${item.name}: ${item.content}`;
        //   let span = document.createElement("span");
        //   span.textContent = item.createdAt;
        //   console.log(span);
        //   li.appendChild(span);
        //   this.messageList.appendChild(li);
        // });
      });
    },
    bindEvents: function() {
      this.form.addEventListener("submit", e => {
        e.preventDefault();
        let name = this.form.querySelector("input[name=name]").value;
        let content = this.form.querySelector("textarea[name=content]").value;
        if (name === "") {
          alert("姓名未填");
        } else if (content === "") {
          alert("内容未填");
        } else {
          this.model
            .save(name, content)
            .then(object => {
              let li = document.createElement("li");
              li.textContent = `${object.attributes.name}: ${
                object.attributes.content
              }`;
              let span=document.createElement('span')
              span.textContent=this.GMTToStr(new Date())
              li.appendChild(span)
              this.messageList.insertBefore(li, this.messageList.firstChild);
            })
            .then(() => {
              this.form.querySelector("input[name=content]").value = "";
            });
        }
      });
    },
    GMTToStr: function(time) {
      let date = new Date(time);
      let Str =
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日 " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return Str;
    }
  });
  controller.init(view, model);
}.call();
