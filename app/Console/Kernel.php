<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        // Puedes registrar comandos aquí
    ];

    protected function schedule(Schedule $schedule)
    {
        // Aquí defines la programación de tus jobs
        // Ejemplo: Ejecutar el job cada 30 minutos
        $schedule->job(new \App\Jobs\ActualizarPreciosJob())->hourly();
    }

    protected function commands()
    {
        // Registra los comandos personalizados
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
