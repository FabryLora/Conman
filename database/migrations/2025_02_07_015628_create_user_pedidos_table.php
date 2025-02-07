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
        Schema::create('user_pedidos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo_postal');
            $table->string('direccion');
            $table->string('telefono');
            $table->string('email');
            $table->string('nombre');
            $table->string('dni');
            $table->string('localidad');
            $table->string('provincia');
            $table->string('razon_social');
            $table->foreignIdFor(Pedido::class, "pedido_id")->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_pedidos');
    }
};
