var ClientServerResolver = {
  apply: function(resolver) {
    resolver.plugin('module', function(request, callback) {

      console.log(request);

      var reqsplit = request.request.split('/')
      var psplit = reqsplit.pop().split('.')

      console.log(psplit);

      if (psplit.length > 2 && psplit[psplit.length-2] === 'server') {
        psplit[psplit.length-2] = 'client'
        var req = reqsplit.push(psplit.join('.')).join('/')
        var obj = {
          path: request.path,
          request: req,
          query: request.query,
          directory: request.directory
        };
        this.doResolve(['file'], obj, callback);
      }
      else {
        callback();
      }
    });
  }
};

module.exports = ClientServerResolver
