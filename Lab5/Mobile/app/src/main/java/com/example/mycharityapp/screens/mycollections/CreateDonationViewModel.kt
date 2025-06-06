package com.example.mycharityapp.screens.mycollections

import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import com.example.mycharityapp.model.CreateDonationRequest
import com.example.mycharityapp.network.RetrofitInstance

class CreateDonationViewModel : ViewModel() {
    var successMessage by mutableStateOf<String?>(null)
    var errorMessage by mutableStateOf<String?>(null)

    fun createDonation(title: String, goal: Int, description: String, creatorId: String) {
        viewModelScope.launch {
            try {
                val request = CreateDonationRequest(title, goal, creatorId, description)
                val response = RetrofitInstance.api.createDonation(request)
                successMessage = "Збір створено: ${response.title}"
                RetrofitInstance.api.getAllDonations()
            } catch (e: Exception) {
                errorMessage = "Помилка: ${e.localizedMessage}"
            }
        }
    }
}
