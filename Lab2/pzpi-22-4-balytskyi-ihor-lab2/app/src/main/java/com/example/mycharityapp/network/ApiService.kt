package com.example.mycharityapp.network


import com.example.mycharityapp.model.Donation
import com.example.mycharityapp.model.CreateDonationRequest
import com.example.mycharityapp.model.DonationLog
import com.example.mycharityapp.model.DonateRequest
import com.example.mycharityapp.model.User
import com.example.mycharityapp.model.requests.RegisterRequest
import com.example.mycharityapp.model.requests.LoginRequest
import retrofit2.http.GET
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Path


interface ApiService {

    @GET("/api/donations")
    suspend fun getAllDonations(): List<Donation>

    @POST("/api/donations")
    suspend fun createDonation(@Body donation: CreateDonationRequest): Donation

    @GET("/api/donations/user/{userId}")
    suspend fun getDonationsByUser(@Path("userId") userId: String): List<Donation>

    @GET("/api/donation-logs/{userId}")
    suspend fun getDonationLogs(@Path("userId") userId: String): List<DonationLog>

    @POST("/api/donations/{id}/donate")
    suspend fun donate(
        @Path("id") donationId: String,
        @Body request: DonateRequest
    )

    @POST("/api/donations/{id}/news")
    suspend fun addNews(
        @Path("id") donationId: String,
        @Body body: Map<String, String>
    )

    @POST("/api/users/register")
    suspend fun registerUser(@Body request: RegisterRequest): User

    @POST("/api/users/login")
    suspend fun loginUser(@Body request: LoginRequest): User


}
