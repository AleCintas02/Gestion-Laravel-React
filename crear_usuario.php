<?php

// Cargar el autoload de Composer
require __DIR__.'/vendor/autoload.php';

// Inicializar la aplicación Laravel
$app = require_once __DIR__.'/bootstrap/app.php';

// Ejecutar la aplicación para cargar la configuración y servicios
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

// Datos del usuario que deseas crear
$name = 'Ale';
$email = 'ale@gmail.com';
$password = '12345678'; // No necesitas encriptarlo manualmente con bcrypt aquí

// Insertar el usuario utilizando el Query Builder
DB::table('users')->insert([
    'name' => $name,
    'email' => $email,
    'password' => Hash::make($password), // Asegúrate de encriptar la contraseña usando Hash::make()
]);

echo 'Usuario creado correctamente' . PHP_EOL;
