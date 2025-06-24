<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Get the currently authenticated user.
     */
    public function getUser()
    {
        return response()->json(Auth::user());
    }

    /**
     * Update authenticated user's basic profile info.
     */
    public function updateUser(Request $request)
    {
        $user = Auth::user();

        // Validate incoming data (adjust rules if allowing password changes)
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            // Add password validation if editing password
        ]);

        $user->update($validated);

        return response()->json($user);
    }

    /**
     * Get the company associated with the authenticated user.
     */
    public function getCompany()
    {
        $company = Auth::user()->company;
        return response()->json($company);
    }

    /**
     * Update the company information linked to the authenticated user.
     */
    public function updateCompany(Request $request)
    {
        $company = Auth::user()->company;

        // Basic validation to ensure required fields are provided
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'contact_email' => 'required|email',
            'contact_phone' => 'nullable|string',
        ]);

        $company->update($validated);

        return response()->json($company);
    }

    /**
     * Fetch all jobs posted by the authenticated user's company.
     * Includes related company data via eager loading.
     */
    public function getJobs()
    {
        $jobs = Job::with('company')
            ->whereHas('company', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->latest()
            ->get();

        return response()->json($jobs);
    }
}
