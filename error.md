# Symfony\Component\ErrorHandler\Error\FatalError - Internal Server Error

Cannot use Illuminate\Database\Eloquent\Relations\BelongsTo as BelongsTo because the name is already in use

PHP 8.3.23
Laravel 12.36.0
srbmotor.test

## Stack Trace

0 - app\Models\Document.php:9

## Request

GET /admin/transactions

## Headers

* **host**: srbmotor.test
* **connection**: keep-alive
* **cache-control**: max-age=0
* **upgrade-insecure-requests**: 1
* **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0
* **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
* **referer**: http://srbmotor.test/admin
* **accept-encoding**: gzip, deflate
* **accept-language**: en-US,en;q=0.9,id;q=0.8
* **cookie**: remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6Iis1ODdZOFFFL0hNUFNjQ2FBSFlSS0E9PSIsInZhbHVlIjoiTmxoZzh4NWZiN0lBQ2hmL1Z4L2YvalFweDZZalA0WmNGSXFPTVVPMFcrL1BjVWNIaG9Uc0NlS0x4MjJTVmMxcHZmN05ZUFAwVWRYU3Y4WkJwRnZQOTc4M3R5K2FrUXYvbEJYckZkc2pUemxuK05ucUFOLzA0SFV4NjJlcWMrbEd0eU5kU1hBZGdWNWtSVEUycjZjVWRnWE1vRGZPZ21qSy9rWWJZc0Zwa2JjYXFkVy9MSEU2NlduS2JOZDdNY0hKZnUvZG9UckJaYms2cWFrTzZwVVlySm5Vc1loREkzVG5MeDgrRmhVOHdKQT0iLCJtYWMiOiJhNTMyOGE2NGNiOTcwNWVjYTQxNjFhN2Y1YWQwMTFlMGZlOTE5NDc0YjBkOWE2ZTQzMjQxZGI5YWI2ZTFkMGM3IiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6InRLYzFPbnhzUitEd0JNMkppNXFGN3c9PSIsInZhbHVlIjoiTjlwSi93NFRKeG52ZUxVa0JpV0hObmhCK0ZZOTRrQ08wTFE2N3FXVE9CWGZyWDI3R1U2VklpY21qZ3JsYXd1Qk5RdVgwSXBJWlpVTFpQc3cwam5ZbTBKanQwdmNzOEQ3TXdhYmhvZC8wV21ydVdhSHdLaSsrMmVBNndGVzRhK1EiLCJtYWMiOiJkNzY4NTBlMmNlNzYwNzM0MzYxNjZmMzU2MWI1NGFlMDQ1Yzk3ZWE4YmZmNTFhZDJkYTcxNmYxOTYyYWQ0YmM4IiwidGFnIjoiIn0%3D; laravel-session=eyJpdiI6Ik1WNjgyVFNwUlFPSWgyd1l6UE51QXc9PSIsInZhbHVlIjoiT0pFMDlJdXNyUTJKUm5FdTVLZE0wcXI4NC9hckc3ZDVvMzl1UElwTGtRZ0l2VzhaMU9vY3d5ZFEwV3gybkgyakVlY2dOeE1tOVQ4UjJsdi9INFowNHBQd1dBaXIremJKb0ZpRzdzUTZjV0xnTThPbUFaTG52TmJDVmt3bFVvM3oiLCJtYWMiOiIwZmNkY2QyM2IzM2Y2ZjRkNDI4ZTc3MDM5MDdkYmQ1YmMzM2ZmNTViZjQyYzMyN2JhODlkMzAwMTNhYjZmN2QyIiwidGFnIjoiIn0%3D

## Route Context

controller: App\Http\Controllers\TransactionController@index
route name: admin.transactions.index
middleware: web, admin

## Route Parameters

No route parameter data available.

## Database Queries

* mysql - select * from `sessions` where `id` = 'dVrmiaqL0SUhU4rF4Lcqavgr7jUDpbf8Mlp2l76C' limit 1 (29.3 ms)
* mysql - select * from `users` where `id` = 1 limit 1 (1.12 ms)
* mysql - select count(*) as aggregate from `transactions` (2.67 ms)
* mysql - select * from `transactions` order by `created_at` desc limit 10 offset 0 (1.27 ms)
* mysql - select * from `users` where `users`.`id` in (1, 3) (1.09 ms)
* mysql - select * from `motors` where `motors`.`id` in (1, 2) (1.22 ms)
* mysql - select * from `credit_details` where `credit_details`.`transaction_id` in (1, 2, 3, 4) (1.35 ms)
* mysql - select distinct `transaction_type` from `transactions` (1.05 ms)
* mysql - select distinct `status` from `transactions` (0.86 ms)
