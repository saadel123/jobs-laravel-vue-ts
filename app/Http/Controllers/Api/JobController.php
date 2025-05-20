<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Company;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Job::with('company')->get();
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

        $company = Company::create([
            'user_id' => 1,
            'name' => $validated['company']['name'],
            'description' => $validated['company']['description'],
            'contact_email' => $validated['company']['contact_email'],
            'contact_phone' => $validated['company']['contact_phone'] ?? null,
        ]);

        $job = $company->jobs()->create($validated);

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
        $job = Job::findOrFail($id);

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

        $job->update($validated);

        $job->company->update([
            'name' => $validated['company']['name'],
            'description' => $validated['company']['description'],
            'contact_email' => $validated['company']['contact_email'],
            'contact_phone' => $validated['company']['contact_phone'] ?? null,
        ]);

        return response()->json($job->load('company'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();
        return response()->noContent();
    }
}
