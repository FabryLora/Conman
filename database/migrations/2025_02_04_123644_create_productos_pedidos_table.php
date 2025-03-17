<?php

use App\Models\Pedido;
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
        Schema::create('productos_pedidos', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('name');
            $table->string('code');
            $table->string('price');
            $table->string('dolar_price');
            $table->string('discount');
            $table->string("cantidad");
            $table->foreignIdFor(Pedido::class, "pedido_id")->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos_pedidos');
    }
};
