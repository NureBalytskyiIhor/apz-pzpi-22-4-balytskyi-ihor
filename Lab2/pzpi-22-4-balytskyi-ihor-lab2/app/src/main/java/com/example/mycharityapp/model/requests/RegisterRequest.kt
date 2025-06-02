package com.example.mycharityapp.model.requests

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String,
    val isVerified: Boolean = false
)