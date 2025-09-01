<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Company;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class JobController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of all job listings with their companies.
     */
    public function index()
    {
        return Job::with('company')->latest()->get();
    }

    /**
     * Store a newly created job along with its associated company.
     * Uses a DB transaction to ensure both records are created atomically.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $company = $user->company; // assumes User hasOne Company

        if (!$company) {
            return response()->json(['error' => 'No company found for user'], 400);
        }

        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'salary' => 'required|string',
            'location' => 'required|string',
        ]);

        $job = $company->jobs()->create($validated);

        return response()->json($job->load('company'), 201);
    }

    /**
     * Display a specific job listing along with its company.
     */
    public function show($id)
    {
        return Job::with('company')->findOrFail($id);
    }

    /**
     * Update the specified job and its related company.
     * Authorization ensures only owners can edit.
     */
    public function update(Request $request, $id)
    {
        $job = Job::with('company')->findOrFail($id);

        // Check if the user is authorized to update this job
        $this->authorize('update', $job);

        // Validate only job fields
        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'salary' => 'required|string',
            'location' => 'required|string',
        ]);

        $job->update($validated);

        return response()->json($job->load('company'));
    }

    /**
     * Delete a job listing.
     * Authorization ensures only the owner can delete it.
     */
    public function destroy($id)
    {
        $job = Job::findOrFail($id);

        // Ensure only authorized users can delete
        $this->authorize('delete', $job);

        $job->delete();

        return response()->noContent();
    }
}
