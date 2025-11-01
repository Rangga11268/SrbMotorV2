# InvalidArgumentException - Internal Server Error

Cannot end a section without first starting one.

PHP 8.3.23
Laravel 12.36.0
srbmotor.test

## Stack Trace

0 - vendor\laravel\framework\src\Illuminate\View\Concerns\ManagesLayouts.php:94
1 - resources\views\pages\admin\users\index.blade.php:132
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

GET /admin/users

## Headers

* **host**: srbmotor.test
* **connection**: keep-alive
* **upgrade-insecure-requests**: 1
* **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0
* **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
* **referer**: http://srbmotor.test/admin
* **accept-encoding**: gzip, deflate
* **accept-language**: en-US,en;q=0.9,id;q=0.8
* **cookie**: remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6Inh1YkxPZkVOZVpXay8zYk83MHpuZnc9PSIsInZhbHVlIjoiclgrSUZvRmZ3UXJSOTdLVDhrNHFDbFdZUmV3b2ZDOVlxaUVHOEp0ejVXUnpFZCtBOHJkUm1oLzVKWmh2c24vRjZQVmhwbkZCdW9MbUVNMEQzRjdDMDJnRHZnNlFSNVp0V25BM0pub2d5cGJHSmEzcWV5S1JkWlRxVHh2VWgrZ3JKazI0bUIzT0tZR2lhclpGM0NrN2NmeFdFZ1JuSldqN2ZsYXpJbCs3akMxRFBlUDdINEtia2lIS1dCRWUxeTBteXllcktwYmRrZzYwYnZVVGRkK1ltZTZFcVEyMk9zNHlLeUx1WFJpclBaST0iLCJtYWMiOiJhNWMxZTQ4MmNmOGE2MjI3NTczYmM1MjIxMWYxMmI4MDlhMjUxNDNlYjQ3ZWVjYWJjZGZkNTNhNThlMjA3ZjFlIiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6IkxCWlZiWC8xYmFNbGc4KzNGV1lDZUE9PSIsInZhbHVlIjoic3VQaGtqaW53b0hHeGxQQURrY0ovMmpIcWRYbGJuemxEUDdzZjEyRFZZUUtJV3JOajVoZjl2YjI1RExMSlRDMU0zVXowbUlUNkNHRnpzTEllL2tsY0dmbHRlMDVkSG5IdlNNRGJVeXBmbEEwVnBGc0U5N1phT0l1SWwraWRUZGQiLCJtYWMiOiI4ZDYzYjJjZmZkZTUwMDI3ZTBiNTE3MjQwMTc4Mjc3NjlhZTliMGRkZDgyNmVmNTU2ZThmYjk3ZGZmNzVjZmZmIiwidGFnIjoiIn0%3D; laravel-session=eyJpdiI6IlI5UGFteVR1OFFtaTFFMGZtck5oeUE9PSIsInZhbHVlIjoiMUd5QktBZCs2RUUzVkI2RFdDNUF6QURMSk53cTRCQ2ZsT2t5T2hkc3RYNS9zTFQxVU1PbS9CVGRHd2w0cmxtcUM2ZjIzQlpiQnZVWEtJOTNUT2tRR3daRW0wQldnYUxnY1FZbUVueThkMHI1SjZqUmVSWlhITWtkSEw5OG5wWXciLCJtYWMiOiJlMTYxMWRhODM5OTAyYjI2ZGFhNGM3YjVmOGY4MDY3NjQzZGZjZGExMzZiZGQxY2E4MWVmMGFkZGM4ODEyYzU4IiwidGFnIjoiIn0%3D

## Route Context

controller: App\Http\Controllers\UserController@index
route name: admin.users.index
middleware: web, admin

## Route Parameters

No route parameter data available.

## Database Queries

* mysql - select * from `sessions` where `id` = 'aEWlobCUtxLSTmCyXCqx8XFuQNQLPZ0OOpBJz4Af' limit 1 (6.96 ms)
* mysql - select * from `users` where `id` = 1 limit 1 (1.02 ms)
* mysql - select * from `users` (1.31 ms)
