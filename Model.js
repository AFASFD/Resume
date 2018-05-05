window.Model = function (options) {
    let resourcename = options.resourcename
    return {
        init: function () {
            var APP_ID = 'Ha2veasjzrpgxBp7tG6lrIc2-gzGzoHsz';
            var APP_KEY = 'Bp2ivSrj15kL2AyHoGvMKQa0';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch: function () {
            var query = new AV.Query(resourcename);
            query.descending('createdAt');
            query.limit(10);
            query.skip(0);
            return query.find()
        },
        save: function (name, content) {
            var Message = AV.Object.extend(resourcename)
            var message = new Message()
            return message.save({
                name: name,
                content: content
            })
        }
    }
}