package com.example.mycharityapp.model

data class DonationLog(
    val userId: String,
    val donationId: String,
    val amount: Int,
    val date: String
)