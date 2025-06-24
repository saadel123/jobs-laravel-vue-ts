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
        // Validate job and nested company data
        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'salary' => 'required|string',
            'location' => 'required|string',
            'company.name' => 'required|string',
            'company.description' => 'required|string',
            'company.contact_email' => 'required|email',
            'company.contact_phone' => 'nullable|string',
        ]);

        // Use DB transaction to ensure both job and company are created together
        $job = DB::transaction(function () use ($validated) {
            // Create company linked to the authenticated user
            $company = Company::create([
                'user_id' => Auth::id(),
                'name' => $validated['company']['name'],
                'description' => $validated['company']['description'],
                'contact_email' => $validated['company']['contact_email'],
                'contact_phone' => $validated['company']['contact_phone'] ?? null,
            ]);

            // Create job for that company
            return $company->jobs()->create($validated);
        });

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

        // Validate job and company fields
        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'salary' => 'required|string',
            'location' => 'required|string',
            'company.name' => 'required|string',
            'company.description' => 'required|string',
            'company.contact_email' => 'required|email',
            'company.contact_phone' => 'nullable|string',
        ]);

        // Perform atomic update for job and company using a transaction
        DB::transaction(function () use ($job, $validated) {
            $job->update($validated);

            $job->company()->update([
                'name' => $validated['company']['name'],
                'description' => $validated['company']['description'],
                'contact_email' => $validated['company']['contact_email'],
                'contact_phone' => $validated['company']['contact_phone'] ?? null,
            ]);
        });

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
