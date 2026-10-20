<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_displays_the_brand_name(): void
    {
        $response = $this->get(route('home'));

        $response
            ->assertOk()
            ->assertSee('Diary Madagascar');
    }
}
