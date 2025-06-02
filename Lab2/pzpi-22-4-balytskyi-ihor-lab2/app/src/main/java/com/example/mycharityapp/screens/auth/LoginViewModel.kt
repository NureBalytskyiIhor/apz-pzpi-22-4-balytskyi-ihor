package com.example.mycharityapp.screens.auth


import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mycharityapp.model.User
import com.example.mycharityapp.network.RetrofitInstance
import kotlinx.coroutines.launch
import androidx.compose.runtime.*
import com.example.mycharityapp.model.requests.LoginRequest

class LoginViewModel : ViewModel() {
    var error by mutableStateOf<String?>(null)
        private set

    fun login(
        email: String,
        password: String,
        onSuccess: (User) -> Unit
    ) {
        viewModelScope.launch {
            try {
                val response = RetrofitInstance.api.loginUser(
                    LoginRequest(email, password)
                )
                error = null
                onSuccess(response)
                Log.d("DEBUG", "Logged in user: ${response.id}, ${response.name}")
            } catch (e: Exception) {
                error = "Невірний email або пароль"
            }
        }
    }
}
