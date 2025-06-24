<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Donation;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::create([
            'name' => 'Usuário Teste',
            'email' => 'teste@exemplo.com',
            'password' => Hash::make('123456'),
            'type' => 'cliente'
        ]);

        $donations = [
            [
                'name' => 'Minha Primeira Campanha',
                'description' => 'Esta é minha primeira campanha de doação para ajudar famílias carentes da região.',
                'organization' => 'Organização Local',
                'goal_amount' => 5000.00,
                'raised_amount' => 1200.00,
                'is_active' => true,
                'user_id' => $user->id
            ],
            [
                'name' => 'Reforma da Casa de Repouso',
                'description' => 'Campanha para reformar a casa de repouso da nossa cidade, proporcionando melhor qualidade de vida aos idosos.',
                'organization' => 'Casa de Repouso São José',
                'goal_amount' => 8000.00,
                'raised_amount' => 3500.00,
                'is_active' => true,
                'user_id' => $user->id
            ],
            [
                'name' => 'Compra de Equipamentos Médicos',
                'description' => 'Arrecadação para compra de equipamentos médicos para o posto de saúde local.',
                'organization' => 'Posto de Saúde Central',
                'goal_amount' => 12000.00,
                'raised_amount' => 7800.00,
                'is_active' => true,
                'user_id' => $user->id
            ]
        ];

        foreach ($donations as $donation) {
            Donation::create($donation);
        }

        echo "Usuário de teste criado com email: teste@exemplo.com e senha: 123456\n";
        echo "3 doações foram criadas para este usuário.\n";
    }
}
