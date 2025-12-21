<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CheckOverdueInstallments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'installments:check-overdue';
    protected $description = 'Check for overdue installments and apply status/penalty';

    public function handle()
    {
        $today = now()->format('Y-m-d');
        
        $overdueInstallments = \App\Models\Installment::where('due_date', '<', $today)
            ->whereIn('status', ['pending', 'waiting_approval'])
            ->get();

        $count = 0;
        foreach ($overdueInstallments as $installment) {
            // Apply Penalty if not already applied
            // Using flat fee: Rp 50.000
            $penalty = 50000;
            
            // Only update if status is not already overdue (or if we want to add penalty to pending ones)
            // Logic: If due_date passed, mark overdue.
            
            $installment->update([
                'status' => 'overdue',
                'penalty_amount' => $penalty
            ]);

            // Notify user via WA? (Optional future enhancement)
            $count++;
        }

        $this->info("Checked installments. {$count} installments marked as overdue.");
    }
}
