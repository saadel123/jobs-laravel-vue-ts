<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Job extends Model
{
    use HasFactory;

    protected $table = 'job_listings';
    protected $fillable = [
        'type',
        'title',
        'description',
        'salary',
        'location',
        'company_id'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
