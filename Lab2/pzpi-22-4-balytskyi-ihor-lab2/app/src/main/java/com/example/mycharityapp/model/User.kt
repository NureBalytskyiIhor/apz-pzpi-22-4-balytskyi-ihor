package com.example.mycharityapp.model

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("_id")
    val id: String,
    val name: String,
    val email: String,
    val password: String,
    val isVerified: Boolean
)