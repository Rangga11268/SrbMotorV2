<?php

namespace App\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface MotorRepositoryInterface
{
    /**
     * Get all motors with caching
     */
    public function getAll($withSpecs = true, $perPage = 10): LengthAwarePaginator;

    /**
     * Get motors with filters and caching
     */
    public function getWithFilters($filters = [], $withSpecs = true, $perPage = 10): LengthAwarePaginator;

    /**
     * Get a single motor by ID with caching
     */
    public function findById($id, $withSpecs = true);

    /**
     * Get popular motors with caching
     */
    public function getPopular($limit = 5, $withSpecs = true);

    /**
     * Get distinct values for filters with caching
     */
    public function getFilterOptions($search = null);

    /**
     * Clear cache for motors
     */
    public function clearCache();
}