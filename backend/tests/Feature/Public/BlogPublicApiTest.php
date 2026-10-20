<?php

namespace Tests\Feature\Public;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlogPublicApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_news_endpoint_returns_an_empty_pagination_when_no_articles_are_published(): void
    {
        $this->getJson('/api/actualites')
            ->assertOk()
            ->assertJsonPath('articles.data', [])
            ->assertJsonPath('articles.current_page', 1);
    }
}
