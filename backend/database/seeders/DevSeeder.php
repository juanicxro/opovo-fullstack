<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

final class DevSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->firstOrCreate(
            ['email' => 'teste@opovo.com'],
            [
                'name' => 'Usuário Teste',
                'password' => Hash::make('12345678'),
            ]
        );

        Post::query()->updateOrCreate(
            ['title' => 'Primeiro post'],
            [
                'content' => 'Conteúdo completo do primeiro post.',
                'author_id' => $user->id,
            ]
        );

        Post::query()->updateOrCreate(
            ['title' => 'Segundo post'],
            [
                'content' => 'Conteúdo completo do segundo post.',
                'author_id' => $user->id,
            ]
        );
    }
}
