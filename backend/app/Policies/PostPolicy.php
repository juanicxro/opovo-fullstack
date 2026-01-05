<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

final class PostPolicy
{
    use HandlesAuthorization;

    public function update(User $user, Post $post): Response
    {
        return $this->ownsPost($user, $post)
            ? Response::allow()
            : Response::deny('Você não tem permissão para editar este post.');
    }

    public function delete(User $user, Post $post): Response
    {
        return $this->ownsPost($user, $post)
            ? Response::allow()
            : Response::deny('Você não tem permissão para excluir este post.');
    }

    private function ownsPost(User $user, Post $post): bool
    {
        return $post->author_id === $user->id;
    }
}
