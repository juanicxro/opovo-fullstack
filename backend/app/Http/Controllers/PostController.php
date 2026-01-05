<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

final class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::query()
            ->with(['author:id,name'])
            ->orderByDesc('created_at')
            ->get(['id', 'title', 'author_id', 'created_at']);

        return response()->json($this->mapPostsToListPayload($posts));
    }

    public function mine(): JsonResponse
    {
        /** @var User $user */
        $user = Auth::guard('api')->user();

        $posts = Post::query()
            ->with(['author:id,name'])
            ->where('author_id', $user->id)
            ->orderByDesc('created_at')
            ->get(['id', 'title', 'author_id', 'created_at']);

        return response()->json($this->mapPostsToListPayload($posts));
    }

    public function show(Post $post): JsonResponse
    {
        $post->loadMissing(['author:id,name']);

        return response()->json([
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'author' => $post->author?->name,
            'created_at' => $post->created_at?->toISOString(),
            'updated_at' => $post->updated_at?->toISOString(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'content' => ['required', 'string'],
        ]);

        /** @var User $user */
        $user = Auth::guard('api')->user();

        $post = Post::query()->create([
            'title' => $data['title'],
            'content' => $data['content'],
            'author_id' => $user->id,
        ]);

        return response()->json([
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'author' => $user->name,
            'created_at' => $post->created_at?->toISOString(),
            'updated_at' => $post->updated_at?->toISOString(),
        ], 201);
    }

    public function update(Request $request, Post $post): JsonResponse
    {
        $data = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:180'],
            'content' => ['sometimes', 'required', 'string'],
        ]);

        $post->fill($data)->save();
        $post->loadMissing(['author:id,name']);

        return response()->json([
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'author' => $post->author?->name,
            'created_at' => $post->created_at?->toISOString(),
            'updated_at' => $post->updated_at?->toISOString(),
        ]);
    }

    public function destroy(Post $post): JsonResponse
    {
        $post->delete();

        return response()->json(null, 204);
    }

    /**
     * @param Collection<int, Post> $posts
     * @return array<int, array<string, mixed>>
     */
    private function mapPostsToListPayload(Collection $posts): array
    {
        return $posts->map(static fn (Post $post): array => [
            'id' => $post->id,
            'title' => $post->title,
            'author' => $post->author?->name,
            'created_at' => $post->created_at?->toISOString(),
        ])->all();
    }
}
