package com.example.mycharityapp.screens.donations

import androidx.compose.runtime.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mycharityapp.model.Donation
import com.example.mycharityapp.network.RetrofitInstance
import kotlinx.coroutines.launch

class DonationsViewModel : ViewModel() {
    var donations by mutableStateOf<List<Donation>>(emptyList())
        private set

    var isLoading by mutableStateOf(true)
        private set

    var errorMessage by mutableStateOf<String?>(null)
        private set

    init {
        loadDonations()
    }

    fun loadDonations() {
        viewModelScope.launch {
            try {
                isLoading = true
                val response = RetrofitInstance.api.getAllDonations()
                donations = response
                errorMessage = null
            } catch (e: Exception) {
                errorMessage = "Помилка: ${e.localizedMessage}"
            } finally {
                isLoading = false
            }
        }
    }
}
