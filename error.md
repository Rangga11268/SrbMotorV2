# Error - Internal Server Error

Call to a member function hasRequiredDocuments() on null

PHP 8.3.23
Laravel 12.36.0
srbmotor.test

## Stack Trace

0 - resources\views\pages\admin\transactions\show.blade.php:229
1 - vendor\laravel\framework\src\Illuminate\Filesystem\Filesystem.php:123
2 - vendor\laravel\framework\src\Illuminate\Filesystem\Filesystem.php:124
3 - vendor\laravel\framework\src\Illuminate\View\Engines\PhpEngine.php:57
4 - vendor\laravel\framework\src\Illuminate\View\Engines\CompilerEngine.php:76
5 - vendor\laravel\framework\src\Illuminate\View\View.php:208
6 - vendor\laravel\framework\src\Illuminate\View\View.php:191
7 - vendor\laravel\framework\src\Illuminate\View\View.php:160
8 - vendor\laravel\framework\src\Illuminate\Http\Response.php:78
9 - vendor\laravel\framework\src\Illuminate\Http\Response.php:34
10 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:939
11 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:906
12 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:821
13 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
14 - app\Http\Middleware\AdminMiddleware.php:27
15 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
16 - vendor\laravel\framework\src\Illuminate\Routing\Middleware\SubstituteBindings.php:50
17 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
18 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken.php:87
19 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
20 - vendor\laravel\framework\src\Illuminate\View\Middleware\ShareErrorsFromSession.php:48
21 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
22 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:120
23 - vendor\laravel\framework\src\Illuminate\Session\Middleware\StartSession.php:63
24 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
25 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse.php:36
26 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
27 - vendor\laravel\framework\src\Illuminate\Cookie\Middleware\EncryptCookies.php:74
28 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
29 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
30 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:821
31 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:800
32 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:764
33 - vendor\laravel\framework\src\Illuminate\Routing\Router.php:753
34 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:200
35 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:180
36 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
37 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull.php:31
38 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
39 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TransformsRequest.php:21
40 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\TrimStrings.php:51
41 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
42 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePostSize.php:27
43 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
44 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance.php:109
45 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
46 - vendor\laravel\framework\src\Illuminate\Http\Middleware\HandleCors.php:48
47 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
48 - vendor\laravel\framework\src\Illuminate\Http\Middleware\TrustProxies.php:58
49 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
50 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\InvokeDeferredCallbacks.php:22
51 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
52 - vendor\laravel\framework\src\Illuminate\Http\Middleware\ValidatePathEncoding.php:26
53 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:219
54 - vendor\laravel\framework\src\Illuminate\Pipeline\Pipeline.php:137
55 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:175
56 - vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php:144
57 - vendor\laravel\framework\src\Illuminate\Foundation\Application.php:1220
58 - public\index.php:20

## Request

GET /admin/transactions/14

## Headers

* **host**: srbmotor.test
* **connection**: keep-alive
* **upgrade-insecure-requests**: 1
* **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0
* **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
* **referer**: http://srbmotor.test/admin/transactions/14/edit
* **accept-encoding**: gzip, deflate
* **accept-language**: en-US,en;q=0.9,id;q=0.8
* **cookie**: remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6InY0OFNob21LZ3lxaGN0bUcwOTVBc3c9PSIsInZhbHVlIjoiYUd3bDMxRmRxekpDR0JuSnJDdUFEcEdQdGZZWHpvR3NkeWZtS2djakVURDlPM2UzNXBPY0ZqQVZ5bmUwSFdIUmF4L0NtcEpmejI1WndEa0s2eFZtcGlaMHlXM3ZCYXpDcDhFWEo5N2xKbXFUMFlNUGhZR2FNWmhZQ0c2OTcyd3JCekE5SnhnWkFTalUrNEpuY1BoUVp0NC9FWmVtSGtxZkttcEIvZEJCOFFkdnBuNC9TZXUraURTUHpuNGx5QUZ1VjAyNVBXQ1FUOXpoRG9kYmxFOU9HeVZUdlU3dWZMcDVqcXZqVmo3SzQ1cz0iLCJtYWMiOiJlYTVmOWRkN2UzNWMxODI0NmM0ZWY5YTgwMGYxZDIxYjdhY2UyOTVlZTNjZjU1YTk4M2I0MjljYzc2NTFkY2IyIiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6InRXTmE2Y3Bqc3dPaG5waXAvQ1g3T3c9PSIsInZhbHVlIjoicXlSaVg0VlRSaVI2SFNIQjdEWUJDeFYwaDJpMVgrdTJNZi84ajRjQ3loTFl1cVFRUWJidWRqSXRrTXlnMGpKcWVzVU1TTndBYVdGeGFFU2dRT3pCbFZwTjVMQWJ2U0psbjdjbHpBaXV0Mk5KejN6RVRra0RkQThkWnhMQkxkaWIiLCJtYWMiOiJmNzBkNDc1Yjk2ODM1ZTllZjYxYmNhZjU0MTM5NGNhYzA1MDc4YjRkM2Q0MDY5YjFiZjU3MWQ4ZTBkNTFlMGVjIiwidGFnIjoiIn0%3D; laravel-session=eyJpdiI6InpjSFdmUHkxSjlaTW5GTDEzTU0weUE9PSIsInZhbHVlIjoiLzZIUEIyRnFKOFBwVGY2MXV4c0FUQkpGSnVrMVpjUk1zb1M5OTNVWGd0eWEzMFFVQjZpbHFiMUh5K0RZSnRzaXVKdy9sK0RGZCtQT1h6Q2RTb2VpRVpCZVBBcmRVaFlHUHF2THNWK2pNeldsME52TTVwWXRadW84dDVKajZqZ0kiLCJtYWMiOiJjNGU0NjBhNzQxNDAyMWVkODQzYjA3NDliNDc5MGIwMzlkNDFlMzgxNzE1MDNmMzMyOThlYmNhYmQ4YTFlODY1IiwidGFnIjoiIn0%3D

## Route Context

controller: App\Http\Controllers\TransactionController@show
route name: admin.transactions.show
middleware: web, admin

## Route Parameters

{
    "transaction": {
        "id": 14,
        "user_id": 4,
        "motor_id": 5,
        "transaction_type": "CREDIT",
        "status": "new_order",
        "notes": "Test BB",
        "booking_fee": "0.00",
        "total_amount": "21000000.00",
        "payment_method": "cash",
        "payment_status": "pending",
        "customer_name": "Rangga",
        "customer_phone": "0897126126",
        "customer_occupation": "Progammer",
        "created_at": "2025-11-18T12:46:07.000000Z",
        "updated_at": "2025-11-18T12:46:07.000000Z"
    }
}

## Database Queries

* mysql - select * from `sessions` where `id` = 'XBrRcaglHJihzSGckkiMJ7PTYLxMHTq5cK0nsqGC' limit 1 (29.8 ms)
* mysql - select * from `transactions` where `id` = '14' limit 1 (1.27 ms)
* mysql - select * from `users` where `id` = 1 limit 1 (1.25 ms)
* mysql - select * from `users` where `users`.`id` in (4) (1.11 ms)
* mysql - select * from `motors` where `motors`.`id` in (5) (1.15 ms)
* mysql - select * from `credit_details` where `credit_details`.`transaction_id` in (14) (1.18 ms)
