<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;
use App\Models\Motor;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some existing motors and users to create sample orders
        $motors = Motor::all();
        $users = User::all();
        
        if ($motors->count() > 0 && $users->count() > 0) {
            // Create first order
            if($motors->first() && $users->first()) {
                Order::create([
                    'user_id' => $users->first()->id,
                    'motor_id' => $motors->first()->id,
                    'customer_name' => 'John Doe',
                    'customer_email' => 'johndoe@example.com',
                    'customer_phone' => '081234567890',
                    'customer_address' => 'Jl. Contoh Alamat No. 123, Kota Bekasi',
                    'order_status' => 'pending',
                    'order_notes' => 'Mohon dilakukan pengecekan menyeluruh sebelum pengiriman',
                    'total_amount' => $motors->first()->price,
                    'payment_method' => 'cash',
                    'payment_status' => 'unpaid',
                    'delivery_option' => 'delivery',
                    'delivery_address' => 'Jl. Contoh Alamat No. 123, Kota Bekasi',
                    'admin_notes' => 'Pesanan baru, perlu diverifikasi'
                ]);
            }
            
            // Create second order
            if($motors->last() && $users->first()) {
                Order::create([
                    'user_id' => $users->first()->id,
                    'motor_id' => $motors->last()->id,
                    'customer_name' => 'Jane Smith',
                    'customer_email' => 'janesmith@example.com',
                    'customer_phone' => '082345678901',
                    'customer_address' => 'Jl. Contoh Alamat No. 456, Kota Jakarta',
                    'order_status' => 'confirmed',
                    'order_notes' => 'Ingin warna hitam dengan aksesori tambahan',
                    'total_amount' => $motors->last()->price,
                    'payment_method' => 'credit',
                    'payment_status' => 'paid',
                    'delivery_option' => 'pickup',
                    'admin_notes' => 'Sudah dikonfirmasi dan pembayaran diterima'
                ]);
            }
            
            // Create third order
            if($motors->count() > 1 && $users->first()) {
                Order::create([
                    'user_id' => null, // Guest order
                    'motor_id' => $motors->skip(1)->first()->id,
                    'customer_name' => 'Bob Johnson',
                    'customer_email' => 'bob@example.com',
                    'customer_phone' => '083456789012',
                    'customer_address' => 'Jl. Contoh Alamat No. 789, Kota Bandung',
                    'order_status' => 'processing',
                    'order_notes' => 'Ingin diantar langsung ke rumah',
                    'total_amount' => $motors->skip(1)->first()->price,
                    'payment_method' => 'dp',
                    'payment_status' => 'pending',
                    'delivery_option' => 'delivery',
                    'delivery_address' => 'Jl. Contoh Alamat No. 789, Kota Bandung',
                    'admin_notes' => 'Menunggu pembayaran DP'
                ]);
            }
        }
    }
}
