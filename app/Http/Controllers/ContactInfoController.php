<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactInfoUpdateRequest;
use App\Models\ContactInfo;
use Illuminate\Http\Request;
use App\Http\Resources\ContactInfoResource;

class ContactInfoController extends Controller
{

    public function index()
    {

        return ContactInfoResource::collection(ContactInfo::paginate(50));
    }


    public function show(ContactInfo $contactInfo)
    {
        return new ContactInfoResource($contactInfo);
    }


    public function update(ContactInfoUpdateRequest $request, ContactInfo $contactInfo)
    {
        $data = $request->validated();
        $contactInfo->update($data);
    }
}
