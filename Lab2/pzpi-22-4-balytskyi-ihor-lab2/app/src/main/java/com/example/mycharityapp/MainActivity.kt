package com.example.mycharityapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.navigation.compose.*
import com.example.mycharityapp.model.User
import com.example.mycharityapp.screens.auth.LoginScreen
import com.example.mycharityapp.screens.auth.RegisterScreen
import com.example.mycharityapp.screens.ui.MainAppNavigation
import com.example.mycharityapp.ui.theme.MyCharityAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MyCharityAppTheme {
                val navController = rememberNavController()
                var currentUser by remember { mutableStateOf<User?>(null) }

                NavHost(
                    navController = navController,
                    startDestination = if (currentUser == null) "login" else "main"
                ) {
                    composable("login") {
                        LoginScreen(
                            onLoginSuccess = {
                                currentUser = it
                                navController.navigate("main") {
                                    popUpTo("login") { inclusive = true }
                                }
                            },
                            onNavigateToRegister = {
                                navController.navigate("register")
                            }
                        )
                    }

                    composable("register") {
                        RegisterScreen(
                            onRegisterSuccess = {
                                currentUser = it
                                navController.navigate("main") {
                                    popUpTo("login") { inclusive = true }
                                }
                            },
                            onBackToLogin = {
                                navController.popBackStack()
                            }
                        )
                    }

                    composable("main") {
                        currentUser?.let { user ->
                            MainAppNavigation(user)
                        } ?: run {
                            Box(
                                modifier = Modifier.fillMaxSize(),
                                contentAlignment = Alignment.Center
                            ) {
                                CircularProgressIndicator()
                            }
                        }
                    }
                }
            }
        }
    }
}
