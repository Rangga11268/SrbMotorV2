# Rollback Procedures for SRB Motors Update

## Overview
This document outlines the procedures to rollback the changes made during the implementation of the motor gallery separation and related features.

## Files and Changes Made

### 1. Controllers
- **App\Http\Controllers\MotorGalleryController.php**: This is a completely new file created for handling the motor gallery, detail, and credit calculation pages. To rollback, simply delete this file.

### 2. Views
- **resources/views/pages/motors/index.blade.php**: New file for the motor gallery page. Delete to rollback.
- **resources/views/pages/motors/show.blade.php**: New file for the motor detail page. Delete to rollback.
- **resources/views/pages/motors/credit_calculation.blade.php**: New file for the credit calculation page. Delete to rollback.
- **resources/views/pages/home.blade.php**: Modified to remove the full motor gallery section and replace with links to the new motors page. To rollback, revert to the previous version that had the full Yamaha/Honda motor galleries.

### 3. Routes
- **routes/web.php**: Added new routes for `/motors`, `/motors/{motor}`, and `/motors/{motor}/credit-calculation`. To rollback, remove these route definitions.

### 4. Model
- No changes were made to existing models, so no rollback needed for models.

### 5. Database
- No new migrations were created for this update (the motor specifications separation was already implemented in a previous update). If a migration was created specifically for this update, run `php artisan migrate:rollback` to rollback.

## Rolling Back Step by Step

### Option 1: Git-based Rollback (Recommended)
If using git version control:
1. Check the git status to see all changed files:
   ```bash
   git status
   ```
2. To completely rollback to the previous commit before these changes:
   ```bash
   git reset --hard HEAD~1
   ```
3. Or, to selectively revert changes:
   ```bash
   git checkout HEAD~1 -- {file-paths}
   ```

### Option 2: Manual Rollback
1. Delete the new controller file:
   ```bash
   rm app/Http/Controllers/MotorGalleryController.php
   ```

2. Delete the new view files:
   ```bash
   rm -rf resources/views/pages/motors/
   ```

3. Revert the changes to the home.blade.php file by restoring the original Yamaha/Honda motor galleries section.

4. Remove the new routes from routes/web.php:
   - Remove: `Route::get('/motors', [MotorGalleryController::class, 'index'])->name('motors.index');`
   - Remove: `Route::get('/motors/{motor}', [MotorGalleryController::class, 'show'])->name('motors.show');`
   - Remove: `Route::get('/motors/{motor}/credit-calculation', [MotorGalleryController::class, 'showCreditCalculation'])->name('motors.credit-calculation');`

5. Update the HomeController to restore the $yamahaMotors and $hondaMotors variables if they were removed.

6. Update the header partial to revert the navigation link changes if needed.

### Option 3: Database Migration Rollback
If a new migration was created for this update:
```bash
php artisan migrate:rollback
```

## Verification Steps After Rollback
1. Run the application to ensure it's working as before the update
2. Verify that all original pages load correctly
3. Check that the original home page motor gallery is displaying again
4. Confirm that all original navigation links are working
5. Run any existing tests to ensure no functionality was broken

## Additional Notes
- Make sure to clear the Laravel cache after rolling back: `php artisan cache:clear`
- If using Laravel's view caching, clear it with: `php artisan view:clear`
- If using Laravel's route caching, clear it with: `php artisan route:clear`