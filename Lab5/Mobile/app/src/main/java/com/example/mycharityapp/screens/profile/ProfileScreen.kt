package com.example.mycharityapp.screens.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.*
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.*
import com.example.mycharityapp.model.User

@Composable
fun ProfileScreen(user: User) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Top
    ) {
        Text("Профіль", style = MaterialTheme.typography.headlineSmall)

        Spacer(modifier = Modifier.height(24.dp))

        Box(
            modifier = Modifier
                .size(100.dp)
                .background(Color.LightGray),
            contentAlignment = Alignment.Center
        ) {
            Text("Фото", fontSize = 14.sp)
        }

        Spacer(modifier = Modifier.height(24.dp))

        Text("Ім’я:", fontWeight = FontWeight.Bold)
        Text(user.name)

        Spacer(modifier = Modifier.height(8.dp))

        Text("Email:", fontWeight = FontWeight.Bold)
        Text(user.email)

        Spacer(modifier = Modifier.height(8.dp))

        Text("Тип акаунта:", fontWeight = FontWeight.Bold)
        Text(if (user.isVerified) "Верифікований" else "Звичайний")
    }
}