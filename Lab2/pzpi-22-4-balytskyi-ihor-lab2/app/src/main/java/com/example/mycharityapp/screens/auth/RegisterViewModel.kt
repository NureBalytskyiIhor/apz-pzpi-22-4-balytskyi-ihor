package com.example.mycharityapp.screens.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mycharityapp.model.User
import com.example.mycharityapp.network.RetrofitInstance
import kotlinx.coroutines.launch
import androidx.compose.runtime.*
import com.example.mycharityapp.model.requests.RegisterRequest

class RegisterViewModel : ViewModel() {
    var error by mutableStateOf<String?>(null)
        private set

    fun register(
        name: String,
        email: String,
        password: String,
        onSuccess: (User) -> Unit
    ) {
        viewModelScope.launch {
            try {
                val request = RegisterRequest(name, email, password)
                val response = RetrofitInstance.api.registerUser(request)
                onSuccess(response)
            } catch (e: Exception) {
                error = e.stackTraceToString()
            }
        }

    }
}
