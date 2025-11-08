# ErrorException - Internal Server Error

Undefined variable $transactions

PHP 8.3.23
Laravel 12.36.0
srbmotor.test

## Stack Trace

0 - app\Http\Controllers\ReportController.php:197
1 - vendor\laravel\framework\src\Illuminate\Collections\Arr.php:786
2 - vendor\laravel\framework\src\Illuminate\Collections\Collection.php:814
3 - vendor\laravel\framework\src\Illuminate\Database\Eloquent\Collection.php:418
4 - app\Http\Controllers\ReportController.php:194
5 - app\Http\Controllers\ReportController.php:61
6 - vendor\laravel\framework\src\Illuminate\Routing\ControllerDispatcher.php:46
7 - vendor\laravel\framework\src\Illuminate\Routing\Route.php:265
8 - vendor\laravel\framework\src\Illuminate\Routing\Route.php:211
9 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:822
10 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
11 - app\Http\Middleware\AdminMiddleware.php:27
12 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
13 - vendor\laravel\framework\src\Illuminate\Routing\Middleware\SubstituteBindings.php:50
14 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
15 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken.php:87
16 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
17 - vendor\laravel\framework\src\Illuminate\View\Middleware\ShareErrorsFromSession.php:48
18 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
19 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:120
20 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:63
21 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
22 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse.php:36
23 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
24 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\EncryptCookies.php:74
25 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
26 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
27 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:821
28 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:800
29 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:764
30 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:753
31 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:200
32 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
33 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
34 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull.php:31
35 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
36 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
37 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TrimStrings.php:51
38 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
39 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePostSize.php:27
40 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
41 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance.php:109
42 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
43 - vendor\laravel\framework\src\Illuminate\Http\Middleware\HandleCors.php:48
44 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
45 - vendor\laravel\framework\src\Illuminate\Http\Middleware\TrustProxies.php:58
46 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
47 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\InvokeDeferredCallbacks.php:22
48 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
49 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePathEncoding.php:26
50 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
51 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
52 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:175
53 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:144
54 - vendor\laravel\framework\src\Illuminate\Foundation\Application.php:1220
55 - public\index.php:20

## Request

GET /admin/reports/generate

## Headers

* **host**: srbmotor.test
* **connection**: keep-alive
* **upgrade-insecure-requests**: 1
* **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0
* **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
* **referer**: http://srbmotor.test/admin/reports/create?type=status
* **accept-encoding**: gzip, deflate
* **accept-language**: en-US,en;q=0.9,id;q=0.8
* **cookie**: remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6InVpRU1xKzlTMWVkSlNrRFd4aUJsdWc9PSIsInZhbHVlIjoidnVKdHcycFA3OUszR2RZYnZYbkJyeEp4ZXhjVUtJYVBrd1BkSXZGd2psRUJYelZCdlRBbUVDcXNtTWl6Y2E5ZjJVd1ljb0NaaTluTmtIenRHT3NGSFlXUlRoa2Y4OGZXVjFNemM0dStWQ3BSM1dVTlJXQWljS3hyZjdtcGpibEtMNUxldVpHeUYrUEEwMDdUUlBaS2thSk5RMmRoUExtUjJlOW02YUoyOW9id2I3dElGYVhlaHlLZlIweWF4bHJMeXRBS3g2L2RhVlhETlE1UHNQQ2FCeHdzcUQ1TTRjbDZhWVRZZ0RPU2RRTT0iLCJtYWMiOiI0MjI3OGQ1N2IzMzAyYzZmNzcyNzBiOTdjMmNmN2EzZjY5NzE1ZmU2OTM3YWU5MTJlMjU3ZGFkN2E3NmIxYWM1IiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6InVza1hUb1B6OWY1dFFqMlpKZ1dRVmc9PSIsInZhbHVlIjoiWmdBbWdPVHpZd09ObzQ5YWVhVlhhWnM0elgvZmRKcWFrZUk3RDlOcE1kSFRyOW1sd0ljZzZ4bmM1QmgxYlJlbGNMRDVkYUs4MVVBUmlQc3RtOUFQZ1EwSllQYkFGbmVZUnFaa205emQwQ3lmT21JZXRkeC9sN1FPQUMraGl1VkwiLCJtYWMiOiJmYmI5NGIzMTlmOThlNzcyMzZkNTY3Nzg3MTZjMTI5NWE0N2E0MDdhN2JiZWEyN2M4ZmNkMzgzM2Y2MWM1NjFhIiwidGFnIjoiIn0%3D; laravel-session=eyJpdiI6IjAvVFpWTnJKZUdMdjNqKzJFUEk3MGc9PSIsInZhbHVlIjoibWp5WTBDTklld0Y1RVlVd0QrOUF4UFdiM0xxdEVhQ21Iek1YaTZ1cXJOSm9iQTlxUlR2dVVQU0d2ZWxzWVRPTCtCaTNLWk5PemRLd3VLOW16WXp2b1RJNU80ZEp5dklFMVdJcUM0anVtekgxemtEQVZFZUs5blVEVCtJcEYrVjIiLCJtYWMiOiJjNTJhNGUzZjc5ZGFlMzRjZDU3Y2E1N2I5MjIxZjAzYmIxYWI5Mjg2YzMzNTgwYzhjZDNiN2IxZDliM2Q3ODU0IiwidGFnIjoiIn0%3D

## Route Context

controller: App\Http\Controllers\ReportController@generate
route name: admin.reports.generate
middleware: web, admin

## Route Parameters

No route parameter data available.

## Database Queries

* mysql - select * from `sessions` where `id` = 'W8m5A5lWbxunQlpd1FgPrDp1FitqIDhewkhWLKN9' limit 1 (5.69 ms)
* mysql - select * from `users` where `id` = 1 limit 1 (1.52 ms)
* mysql - select * from `transactions` where `created_at` between '2025-11-01 00:00:00' and '2025-11-08 23:59:59' (1.64 ms)
* mysql - select * from `motors` where `motors`.`id` in (1) (1.53 ms)
* mysql - select * from `users` where `users`.`id` in (1) (1.14 ms)
