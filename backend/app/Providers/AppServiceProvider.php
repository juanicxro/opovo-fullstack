<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

final class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        RateLimiter::for('auth-login', static function (Request $request): array {
            $ip = (string) $request->ip();
            $email = strtolower((string) $request->input('email', ''));

            return [
                Limit::perMinute(10)->by("login:ip:{$ip}"),
                Limit::perMinute(5)->by("login:email:{$email}"),
            ];
        });

        RateLimiter::for('auth-register', static function (Request $request): array {
            $ip = (string) $request->ip();
            $email = strtolower((string) $request->input('email', ''));

            return [
                Limit::perMinute(3)->by("register:ip:{$ip}"),
                Limit::perMinute(3)->by("register:email:{$email}"),
            ];
        });

        RateLimiter::for('posts-write', static function (Request $request): Limit {
            $userId = $request->user('api')?->id;

            $key = $userId !== null
                ? 'posts:user:' . (string) $userId
                : 'posts:ip:' . (string) $request->ip();

            return Limit::perMinute(30)->by($key);
        });
    }
}
