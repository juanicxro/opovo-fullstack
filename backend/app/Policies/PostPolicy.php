<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

final class PostPolicy
{
    public function update(User $user, Post $post): Response
    {
        return (int) $post->author_id === (int) $user->id
            ? Response::allow()
            : Response::deny('Você não tem permissão para editar este post.');
    }

    public function delete(User $user, Post $post): Response
    {
        return (int) $post->author_id === (int) $user->id
            ? Response::allow()
            : Response::deny('Você não tem permissão para excluir este post.');
    }
}
