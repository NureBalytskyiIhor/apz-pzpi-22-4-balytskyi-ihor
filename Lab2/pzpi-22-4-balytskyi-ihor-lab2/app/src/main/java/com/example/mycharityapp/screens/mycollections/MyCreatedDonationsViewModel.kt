package com.example.mycharityapp.screens.mycollections

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mycharityapp.model.Donation
import com.example.mycharityapp.network.RetrofitInstance
import kotlinx.coroutines.launch
import androidx.compose.runtime.*

class MyCreatedDonationsViewModel : ViewModel() {
    var donations by mutableStateOf<List<Donation>>(emptyList())
        private set

    var isLoading by mutableStateOf(true)
        private set

    var errorMessage by mutableStateOf<String?>(null)
        private set

    fun loadUserDonations(userId: String) {
        viewModelScope.launch {
            try {
                donations = RetrofitInstance.api.getDonationsByUser(userId)
                isLoading = false
            } catch (e: Exception) {
                errorMessage = "Помилка: ${e.localizedMessage}"
                isLoading = false
            }
        }
    }
}
