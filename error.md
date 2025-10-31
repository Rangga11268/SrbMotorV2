# BadMethodCallException - Internal Server Error

Method Illuminate\Database\Eloquent\Collection::hasPages does not exist.

PHP 8.3.23
Laravel 12.36.0
srbmotor.test

## Stack Trace

0 - vendor\laravel\framework\src\Illuminate\Macroable\Traits\Macroable.php:115
1 - resources\views\pages\admin\motors\index.blade.php:107
2 - vendor\laravel\framework\src\Illuminate\Filesystem\Filesystem.php:123
3 - vendor\laravel\framework\src\Illuminate\Filesystem\Filesystem.php:124
4 - vendor\laravel\framework\src\Illuminate\View\Engines\PhpEngine.php:57
5 - vendor\laravel\framework\src\Illuminate\View\Engines\CompilerEngine.php:76
6 - vendor\laravel\framework\src\Illuminate\View\View.php:208
7 - vendor\laravel\framework\src\Illuminate\View\View.php:191
8 - vendor\laravel\framework\src\Illuminate\View\View.php:160
9 - vendor\laravel\framework\src\Illuminate\Http\Response.php:78
10 - vendor\laravel\framework\src\Illuminate\Http\Response.php:34
11 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:939
12 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:906
13 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:821
14 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
15 - app\Http\Middleware\AdminMiddleware.php:27
16 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
17 - vendor\laravel\framework\src\Illuminate\Routing\Middleware\SubstituteBindings.php:50
18 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
19 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken.php:87
20 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
21 - vendor\laravel\framework\src\Illuminate\View\Middleware\ShareErrorsFromSession.php:48
22 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
23 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:120
24 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:63
25 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
26 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse.php:36
27 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
28 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\EncryptCookies.php:74
29 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
30 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
31 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:821
32 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:800
33 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:764
34 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:753
35 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:200
36 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
37 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
38 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull.php:31
39 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
40 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
41 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TrimStrings.php:51
42 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
43 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePostSize.php:27
44 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
45 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance.php:109
46 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
47 - vendor\laravel\framework\src\Illuminate\Http\Middleware\HandleCors.php:48
48 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
49 - vendor\laravel\framework\src\Illuminate\Http\Middleware\TrustProxies.php:58
50 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
51 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\InvokeDeferredCallbacks.php:22
52 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
53 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePathEncoding.php:26
54 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
55 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
56 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:175
57 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:144
58 - vendor\laravel\framework\src\Illuminate\Foundation\Application.php:1220
59 - public\index.php:20

## Request

GET /admin/motors

## Headers

* **host**: srbmotor.test
* **connection**: keep-alive
* **cache-control**: max-age=0
* **upgrade-insecure-requests**: 1
* **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0
* **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
* **referer**: http://srbmotor.test/admin/motors
* **accept-encoding**: gzip, deflate
* **accept-language**: en-US,en;q=0.9,id;q=0.8
* **cookie**: remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6IkhXOXFTNE92WHRCSGd2RzZBNU1HTFE9PSIsInZhbHVlIjoiVFgyeThaMnlKWlcvMklCdlRUNlVFRnhoN3BrUXFTdkExc3dUQjNXUXgyemcxRTVTRjR1R0lDSVBuTURDWVErTmxCM2Y2VWpncGxwM2poczBCbFBCQllodS9abFZZdkZqeEJGcDc1NUNxcHFxTzhFVnk3SmYxRnl0dDNxdVZpVkV4emN4Ryt3c0JSaVdIcjRLMHp5TVNLYXVYc3BHeDlheDgzbzRwMTFhdlJRTWxhWWlWL1o3enRMQTNmdGZVbmNkV29UQkZ6dC8xSUhzYUJ0Yll3U0txZlNpVzhZYlltOGMyTnU4M1VLTDh4Zz0iLCJtYWMiOiIwOGZkMzJiMWZiMDI3YmNlNTdmYzllOTZkOTAyNGNhZTM2ZjI5MTcwMzJjYjk0ZTA4ODk2NjI0MmFhMWU4ZmVlIiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6IjFxNkF1VTVTVU1oeXA0UFRoSXdiYXc9PSIsInZhbHVlIjoidk5HWHpONkpHSlBYZkl4cnpTRC94SVhER0E1ZFJKcDA3NFVIbFlJT2JMN2d3OUU3WTNGenMwM3hIVmkxQkx3OWNEcEYyOXNxOGxMVjR0VUdKL2VjR0RUL2txeG9HYzN6aGFsYThMT0N3OXdaRFVoTTR3YU5PQm5nZk51eUhLa3IiLCJtYWMiOiJmNjlmYmEyZjgxMjQzNzU2MjQ1OTZlMjI2Nzk4MzVmNmZmZGYzMjAxODk3N2MxZDM1ZmQ1MjU1OGM5NmFjNmU4IiwidGFnIjoiIn0%3D; laravel-session=eyJpdiI6IjQ1QnVnYkhNamhMSU1KUnE4SkZTMFE9PSIsInZhbHVlIjoiWTNLVVdCdGJmUWpNcGYveEtEbU9LOEZ3NjlieGZIYkFnQ2xaQlVFaEpjVjFUQkUzUnRVTE9KVnRITGZyQ3lQcjdwTXArU2pBb0UvZmR4S3Q0aTNhaHY4VWEzMXAwaW9DRDQyM0Y0ZnlyeTJYZGFEMW10YVV3ZG9JRWcvRGd4MlAiLCJtYWMiOiI0YWM0NWM1MWViMjY4Y2RhYWI1OTA0ZjQ5N2NmY2JmYzIxY2QxMTVlZjI0NzljZTg4NjQ1ZDY0OGI2ODQwZGMwIiwidGFnIjoiIn0%3D

## Route Context

controller: App\Http\Controllers\MotorController@index
route name: admin.motors.index
middleware: web, admin

## Route Parameters

No route parameter data available.

## Database Queries

* mysql - select * from `sessions` where `id` = '33Wg5S8o2CmOVaSol2EEbOokuLE9qiPOSyOuZGGJ' limit 1 (7.13 ms)
* mysql - select * from `users` where `id` = 1 limit 1 (2.19 ms)
* mysql - select * from `motors` (1.33 ms)
