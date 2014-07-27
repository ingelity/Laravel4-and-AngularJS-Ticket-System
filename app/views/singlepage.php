<!doctype html>
<html lang="en" ng-app="app">
<head>
  <meta charset="UTF-8">
  <title>Tickets system</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/bootstrap-responsive.min.css">
  <link rel="stylesheet" href="/css/app.css">
  <script src="/js/lib/angular.js"></script>
  <script src="/js/lib/angular-sanitize.js"></script>
  <script src="/js/lib/underscore.js"></script>
  <script src="/js/app.js"></script>
  <script src="/js/services.js"></script>
  <script src="/js/directives.js"></script>
  <script src="/js/controllers.js"></script>
  <script src="/js/run.js"></script>
  <script>
    angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
  </script>
</head>
<body>

  <div class="text-center">
    <div class="large-12">
      <div>
        <div class="large-6 large-offset-3">
          <div id="flash" class="alert-box alert" ng-show="flash">
            {{ flash }}
          </div>
        </div>
      </div>
      <div id="view" ng-view></div>
    </div>
  </div>

</body>
</html>
