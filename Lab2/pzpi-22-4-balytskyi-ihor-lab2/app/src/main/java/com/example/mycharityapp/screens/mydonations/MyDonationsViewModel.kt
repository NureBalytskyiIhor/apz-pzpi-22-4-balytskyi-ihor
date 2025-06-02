package com.example.mycharityapp.screens.mydonations

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mycharityapp.model.DonationLog
import com.example.mycharityapp.network.RetrofitInstance
import kotlinx.coroutines.launch
import androidx.compose.runtime.*

class MyDonationsViewModel : ViewModel() {

    var logs by mutableStateOf<List<DonationLog>>(emptyList())
        private set

    var isLoading by mutableStateOf(true)
        private set

    var errorMessage by mutableStateOf<String?>(null)
        private set
    fun setError(message: String) {
        errorMessage = message
        isLoading = false
    }
    fun loadLogs(userId: String) {
        viewModelScope.launch {
            try {
                logs = RetrofitInstance.api.getDonationLogs(userId)
                isLoading = false
            } catch (e: Exception) {
                errorMessage = "Помилка: ${e.localizedMessage}"
                isLoading = false
            }
        }
    }
}
