package com.example.mycharityapp.screens.donations

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mycharityapp.model.DonateRequest
import com.example.mycharityapp.network.RetrofitInstance
import kotlinx.coroutines.launch
import androidx.compose.runtime.*

class DonateViewModel : ViewModel() {
    var successMessage by mutableStateOf<String?>(null)
        private set
    var errorMessage by mutableStateOf<String?>(null)
        private set

    fun donate(userId: String, donationId: String, amount: Int) {
        viewModelScope.launch {
            try {
                val request = DonateRequest(userId, amount)
                RetrofitInstance.api.donate(donationId, request)
                successMessage = "Дякуємо за донат!"
            } catch (e: Exception) {
                errorMessage = "Помилка: ${e.localizedMessage}"
            }
        }
    }
}
