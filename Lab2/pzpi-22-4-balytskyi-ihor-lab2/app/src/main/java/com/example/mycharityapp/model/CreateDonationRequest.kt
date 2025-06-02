package com.example.mycharityapp.model

data class CreateDonationRequest(
    val title: String,
    val goal: Int,
    val creatorId: String,
    val description: String
)

