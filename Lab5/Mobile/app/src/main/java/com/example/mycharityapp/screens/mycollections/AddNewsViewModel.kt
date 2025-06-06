package com.example.mycharityapp.screens.mycollections


import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mycharityapp.network.RetrofitInstance
import kotlinx.coroutines.launch
import androidx.compose.runtime.*

class AddNewsViewModel : ViewModel() {
    var success by mutableStateOf<String?>(null)
        private set

    var error by mutableStateOf<String?>(null)
        private set

    fun sendNews(donationId: String, title: String, content: String) {
        viewModelScope.launch {
            try {
                val requestBody = mapOf(
                    "title" to title,
                    "content" to content
                )
                RetrofitInstance.api.addNews(donationId, requestBody)
                success = "Новину додано!"
                error = null
            } catch (e: Exception) {
                success = null
                error = "Помилка: ${e.localizedMessage}"
            }
        }
    }
}
