package com.example.mycharityapp.screens.mycollections

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.mycharityapp.model.User

@Composable
fun MyCreatedDonationsScreen(user: User, navController: NavController) {
    val viewModel: MyCreatedDonationsViewModel = viewModel()

    val myDonations = viewModel.donations
    val isLoading = viewModel.isLoading
    val errorMessage = viewModel.errorMessage

    LaunchedEffect(Unit) {
        viewModel.loadUserDonations(user.id)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(bottom = 72.dp)
    ) {
        Text(
            text = "Мої збори",
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.padding(16.dp)
        )

        when {
            isLoading -> {
                CircularProgressIndicator(modifier = Modifier.padding(16.dp))
            }
            errorMessage != null -> {
                Text(
                    text = errorMessage ?: "Помилка",
                    color = MaterialTheme.colorScheme.error,
                    modifier = Modifier.padding(16.dp)
                )
            }
            myDonations.isEmpty() -> {
                Text("У вас ще немає створених зборів", modifier = Modifier.padding(16.dp))
            }
            else -> {
                LazyColumn(contentPadding = PaddingValues(horizontal = 16.dp)) {
                    items(myDonations) { donation ->
                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 8.dp)
                        ) {
                            Column(modifier = Modifier.padding(12.dp)) {
                                Text(donation.title, style = MaterialTheme.typography.titleMedium)
                                Text("Мета: ${donation.goal} грн")
                                Text("Зібрано: ${donation.raised} грн")
                                Spacer(modifier = Modifier.height(8.dp))
                                Button(onClick = {
                                    navController.navigate("details/${donation.id}")
                                }) {
                                    Text("Перейти до збору")
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        contentAlignment = Alignment.BottomCenter
    ) {
        Button(
            onClick = {
                navController.navigate("create_donation_form")
            },
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4CAF50))
        ) {
            Text("Створити збір", color = Color.White)
        }
    }
}
