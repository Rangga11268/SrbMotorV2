# InvalidArgumentException - Internal Server Error

Cannot end a section without first starting one.

PHP 8.3.23
Laravel 12.36.0
srbmotor.test

## Stack Trace

0 - vendor\laravel\framework\src\Illuminate\View\Concerns\ManagesLayouts.php:94
1 - resources\views\profile\edit.blade.php:129
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
15 - vendor\laravel\framework\src\Illuminate\Routing\Middleware\SubstituteBindings.php:50
16 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
17 - vendor\laravel\framework\src\Illuminate\Auth\Middleware\Authenticate.php:63
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

GET /profile/edit

## Headers

* **host**: srbmotor.test
* **connection**: keep-alive
* **upgrade-insecure-requests**: 1
* **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0
* **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
* **referer**: http://srbmotor.test/profile
* **accept-encoding**: gzip, deflate
* **accept-language**: en-US,en;q=0.9,id;q=0.8
* **cookie**: remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6ImU5Y1NNc0VjQkQrQUloMURhbWNlbnc9PSIsInZhbHVlIjoiQUpUUGFoL3RjWXJPblA2Z2pIK0xPbS9BRjF6Qlprc0t6SkxzWFZnVFZ5T20wVDNJUllQSkRVNEgxN29hTjBNYkxMVXFqTTgwN3kzeWFFNldleUZXdVh6LzI4VnZSQjJRQ2NtbXVRTGNuQmpleUZWODA4bFp1dE8vT3JQUkZHMTZpdHFvSHdQYmFrVEE5RzBHZysyMm0xRDVhME45d1NobklESEVjQ1hTZ3lVMlpyeHZEVkRaK2pnRXZCcjJmTTlzSW9qM2kvWUVqeHMrMUlOUXdXVk91bVRqUS93OThVODQrT1BmOEZnS20zTT0iLCJtYWMiOiJlYmQ4ZTYxMzhkYTA4ZDI3YjA4ZGJiOGMyMzRlZGJiYTQ5MWZkZGZlYmNkZGIxOTE1Njc1M2YwOTFhMzVkZTg3IiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6ImlTdy9uaUR0bGlFd2xsbWM1ckt1ZXc9PSIsInZhbHVlIjoiUkcxcjI5cDVEQlp4TS9hdFBMRU8rNDZKUEU5bVJWcWtOYmxseEFoK0UvcXhOcm5NRW42ZG14STdFblF2dStXYjVOaklHSkhTcEdOeVZlMVdoSm5vUkJMMFgzd2I0MDJ1NzloOUlQOXF0VlFibGhiK3RISk1veEEya3JjWTVXT3oiLCJtYWMiOiJkZTE1MjE4MGVmOTYyZGYwMWRjNmQ5YjU5MDdjMmE2NzViNTc4Njg3ZmNhN2YzMzA0MmM0ZmU3Zjg3ODlkNjA4IiwidGFnIjoiIn0%3D; laravel-session=eyJpdiI6Ikxjbmh4b3F4b1ltREpabUlIQUcrWFE9PSIsInZhbHVlIjoiRUd2OUVOOXlmZUMxVWRBTmxzZFFYNmNsaENoUUxoWUlxazhjQUpiRFc5YUZzMHgyVFpZOHM1MnFMb25od1hoQlFXVENINzhNTTJDNDc3THgvcnpac3ZSVTduT1V4eDRlaVJIblhsanp3WjdzMERCcEZpOC9Ib253clpWLytRa3EiLCJtYWMiOiIwN2YzZTJiNDI2ZDBkNmM0NzBlNzY4NjkzN2YxNjI0ZWQ3ZDkyOGE5ODdlNzZiNDc5MWFmYWI5NTUzM2FmMGFiIiwidGFnIjoiIn0%3D

## Route Context

controller: App\Http\Controllers\ProfileController@edit
route name: profile.edit
middleware: web, auth

## Route Parameters

No route parameter data available.

## Database Queries

* mysql - select * from `sessions` where `id` = 'Ge8pLpeys5ypC9gyLUhWrx0Okn8DH8mi1YynRNaf' limit 1 (6.84 ms)
* mysql - select * from `users` where `id` = 1 limit 1 (1.11 ms)
