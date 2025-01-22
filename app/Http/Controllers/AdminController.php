<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginAdminRequest;
use Illuminate\Http\Request;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{

    public function login(LoginAdminRequest $request) {
        
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }
        /**  @var \App\Models\Admin $admin */
        $admin = Auth::user();
        $adminToken = $admin->createToken('main')->plainTextToken;
    
        return response([
            'user' => $admin,
            'adminToken' => $adminToken
        ]);
    }

    
    public function me(Request $request) {
        return response()->json(Admin::all());
        
    }

    /* public function updateProfile(Request $request)
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|nullable|min:8|confirmed',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json($user);
    } */
}