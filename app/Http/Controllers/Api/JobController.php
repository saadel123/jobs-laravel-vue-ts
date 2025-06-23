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
     * Display a listing of the resource.
     */

    public function index()
    {
        return Job::with('company')->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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

        $job = DB::transaction(function () use ($validated) {
            $company = Company::create([
                'user_id' => Auth::id(),
                'name' => $validated['company']['name'],
                'description' => $validated['company']['description'],
                'contact_email' => $validated['company']['contact_email'],
                'contact_phone' => $validated['company']['contact_phone'] ?? null,
            ]);

            return $company->jobs()->create($validated);
        });

        return response()->json($job->load('company'), 201);

    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Job::with('company')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $job = Job::with('company')->findOrFail($id);

        $this->authorize('update', $job);

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

        // Database transaction for atomic updates
        DB::transaction(function () use ($job, $validated) {
            // Update job
            $job->update($validated);

            // Update associated company
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
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $this->authorize('delete', $job);
        $job->delete();
        return response()->noContent();
    }
}
