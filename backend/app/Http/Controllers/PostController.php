<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = \App\Models\Post::query()
            ->with(['author:id,name'])
            ->orderByDesc('created_at')
            ->get(['id', 'title', 'author_id', 'created_at']);

        $payload = $posts->map(static function (\App\Models\Post $post): array {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'author' => $post->author?->name,
                'created_at' => $post->created_at?->toISOString(),
            ];
        });

        return response()->json($payload);
    }

    public function show(\App\Models\Post $post): JsonResponse
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

        /** @var \App\Models\User $user */
        $user = auth('api')->user();

        $post = \App\Models\Post::query()->create([
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


    public function update(Request $request, \App\Models\Post $post): JsonResponse
    {
        $data = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:180'],
            'content' => ['sometimes', 'required', 'string'],
        ]);

        $post->fill($data);
        $post->save();

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


    public function destroy(\App\Models\Post $post): JsonResponse
    {
        $post->delete();

        return response()->json(null, 204);
    }

}
