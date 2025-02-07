<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginAdminRequest;
use Illuminate\Http\Request;

use App\Http\Requests\SignupAdminRequest;
use App\Http\Resources\AdminResource;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{

    public function index(Request $request)
    {
        return AdminResource::collection(Admin::all());
    }

    public function signup(SignupAdminRequest $request)
    {
        $data = $request->validated();

        /**  @var \App\Models\Admin $admin */
        $admin = Admin::create([
            'name' => $data['name'],
            'password' => bcrypt($data['password'])
        ]);
        $adminToken = $admin->createToken('main')->plainTextToken;

        return response([
            'user' => $admin,
            'adminToken' => $adminToken
        ]);
    }

    public function login(LoginAdminRequest $request)
    {

        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::guard('admin')->attempt(['name' => $credentials['name'], 'password' => $credentials['password']], $remember)) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }

        /**  @var \App\Models\Admin $admin */
        $admin = Auth::guard('admin')->user();
        $adminToken = $admin->createToken('main')->plainTextToken;

        return response([
            'user' => $admin,
            'adminToken' => $adminToken
        ]);
    }

    public function show(Request $request, $id)
    {
        return response()->json(Admin::find($id));
    }




    public function me(Request $request)
    {
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
