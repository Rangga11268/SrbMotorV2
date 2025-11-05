# Illuminate\Database\QueryException - Internal Server Error

SQLSTATE[42S02]: Base table or view not found: 1146 Table 'srbmotor.sessions' doesn't exist (Connection: mysql, SQL: select * from `sessions` where `id` = o4gngyTm0PCFb7swLsAWMbbYXbrgr2cCRMjRqyag limit 1)

PHP 8.3.23
Laravel 12.36.0
srbmotor.test

## Stack Trace

0 - vendor\laravel\framework\src\Illuminate\Database\Connection.php:824
1 - vendor\laravel\framework\src\Illuminate\Database\Connection.php:778
2 - vendor\laravel\framework\src\Illuminate\Database\Connection.php:397
3 - vendor\laravel\framework\src\Illuminate\Database\Query\Builder.php:3188
4 - vendor\laravel\framework\src\Illuminate\Database\Query\Builder.php:3173
5 - vendor\laravel\framework\src\Illuminate\Database\Query\Builder.php:3763
6 - vendor\laravel\framework\src\Illuminate\Database\Query\Builder.php:3172
7 - vendor\laravel\framework\src\Illuminate\Database\Concerns\BuildsQueries.php:366
8 - vendor\laravel\framework\src\Illuminate\Database\Query\Builder.php:3095
9 - vendor\laravel\framework\src\Illuminate\Session\DatabaseSessionHandler.php:96
10 - vendor\laravel\framework\src\Illuminate\Session\Store.php:117
11 - vendor\laravel\framework\src\Illuminate\Session\Store.php:105
12 - vendor\laravel\framework\src\Illuminate\Session\Store.php:89
13 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:146
14 - vendor\laravel\framework\src\Illuminate\Support\helpers.php:390
15 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:143
16 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:115
17 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:63
18 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
19 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse.php:36
20 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
21 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\EncryptCookies.php:74
22 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
23 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
24 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:821
25 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:800
26 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:764
27 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:753
28 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:200
29 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
30 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
31 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull.php:31
32 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
33 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
34 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TrimStrings.php:51
35 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
36 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePostSize.php:27
37 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
38 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance.php:109
39 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
40 - vendor\laravel\framework\src\Illuminate\Http\Middleware\HandleCors.php:48
41 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
42 - vendor\laravel\framework\src\Illuminate\Http\Middleware\TrustProxies.php:58
43 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
44 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\InvokeDeferredCallbacks.php:22
45 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
46 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePathEncoding.php:26
47 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
48 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
49 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:175
50 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:144
51 - vendor\laravel\framework\src\Illuminate\Foundation\Application.php:1220
52 - public\index.php:20

## Request

GET /

## Headers

* **host**: srbmotor.test
* **connection**: keep-alive
* **cache-control**: max-age=0
* **upgrade-insecure-requests**: 1
* **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0
* **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
* **referer**: http://srbmotor.test/motors/order-confirmation/1
* **accept-encoding**: gzip, deflate
* **accept-language**: en-US,en;q=0.9,id;q=0.8
* **cookie**: XSRF-TOKEN=eyJpdiI6IklaNmxkKzZBU0pqOTRwUnovVTNZY1E9PSIsInZhbHVlIjoidVl2aWhTWnJoK3RHb1U3QzVxcEgxRzVqdGw3bVN4L0Z3UlIzSGVOeGNSRjg1MzNkUG80eCtxeUoxT1J2eU1GeEZJSndQWHVmcy9vZHg0OW52MExwYTQ0eEd3b0ViMDlPQVJ1MlBza3d5RE1iRjA5cW1oenZodUZDRCtQdmlxQ1UiLCJtYWMiOiJhOTcwZmQ5MmY2ZWIwMzViODhmODY3YmFhN2U2ZWI3YzgzZWNlYjA3N2Y3MzY4Zjk4ZWQ5NzgyYTcxMjQxZjYzIiwidGFnIjoiIn0%3D; laravel-session=eyJpdiI6ImRuQVl3d3l5bERRMHNBb3d6ZGlKb3c9PSIsInZhbHVlIjoiRmtVaVNmWndQVHlhOWxyWWNiOHZnUmFvc2YweElNeWpTQUVQQ1krZDhsTzJtOEprQ1N4MkxqcE1idEpTN3lOZ3BudlNSZTVNT0p1Tmg3bXNxSjdEUUM0b2NYZGlHbHlkc0p5dDgyZlU0aWMwZ1o4VTM3VVZPRnJjRGtiUXdZckoiLCJtYWMiOiIzMjQ4MjhmMWQzMTFmNThiM2YwMTY2OGE4OGM1ZjgxYjRmMTEwOGM3YmUxMzdmM2Q3NGE1MzE2NDlkYTYyMjc0IiwidGFnIjoiIn0%3D

## Route Context

controller: App\Http\Controllers\HomeController@__invoke
route name: home
middleware: web

## Route Parameters

No route parameter data available.

## Database Queries

No database queries detected.
