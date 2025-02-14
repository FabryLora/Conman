<?php

use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('real_products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code');
            $table->double('price');
            $table->double("dolar_price");
            $table->string("image")->nullable();
            $table->unsignedInteger('discount');
            $table->foreignIdFor(Product::class, 'product_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('real_products');
    }
};
