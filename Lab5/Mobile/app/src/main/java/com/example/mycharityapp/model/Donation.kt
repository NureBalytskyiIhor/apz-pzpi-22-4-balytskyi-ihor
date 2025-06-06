package com.example.mycharityapp.model

import com.google.gson.annotations.SerializedName

data class Donation(
    @SerializedName("_id")
    val id: String,
    val title: String,
    val goal: Int,
    val description: String,
    val raised: Int,
    val timestamp: Long,
    val creatorId: String,
    val news: List<NewsItem>
)


data class NewsItem(
    val id: String,
    val date: String,
    val content: String
)