<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Donation;

class DonationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $donations = [
            [
                'name' => 'Ajuda para Enchentes no Rio Grande do Sul',
                'description' => 'Campanha para ajudar as vítimas das enchentes no RS. Os recursos serão destinados para compra de alimentos, água potável, roupas e medicamentos básicos.',
                'organization' => 'Cruz Vermelha Brasileira',
                'goal_amount' => 50000.00,
                'raised_amount' => 15750.00,
                'is_active' => true,
            ],
            [
                'name' => 'Reconstrução da Escola Municipal',
                'description' => 'Ajude na reconstrução da Escola Municipal João Silva, que foi danificada pelas chuvas. As crianças precisam voltar às aulas em um ambiente seguro.',
                'organization' => 'Prefeitura Municipal',
                'goal_amount' => 25000.00,
                'raised_amount' => 8500.00,
                'is_active' => true,
            ],
            [
                'name' => 'Doação de Cestas Básicas',
                'description' => 'Campanha permanente para distribuição de cestas básicas para famílias em situação de vulnerabilidade social.',
                'organization' => 'Ação Social Comunitária',
                'goal_amount' => 15000.00,
                'raised_amount' => 12300.00,
                'is_active' => true,
            ],
            [
                'name' => 'Tratamento para Animais Abandonados',
                'description' => 'Recursos para tratamento veterinário, alimentação e cuidados de animais resgatados das ruas.',
                'organization' => 'ONG Patinhas Carentes',
                'goal_amount' => 10000.00,
                'raised_amount' => 3200.00,
                'is_active' => true,
            ],
            [
                'name' => 'Reforma do Lar de Idosos',
                'description' => 'Campanha para reforma das instalações do Lar dos Idosos São Vicente, melhorando a qualidade de vida dos residentes.',
                'organization' => 'Lar dos Idosos São Vicente',
                'goal_amount' => 30000.00,
                'raised_amount' => 18900.00,
                'is_active' => true,
            ]
        ];

        foreach ($donations as $donation) {
            Donation::create($donation);
        }
    }
}
