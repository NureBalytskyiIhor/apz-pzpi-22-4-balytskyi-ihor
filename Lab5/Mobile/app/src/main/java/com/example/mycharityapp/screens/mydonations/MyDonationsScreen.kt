package com.example.mycharityapp.screens.mydonations

import android.util.Log
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.mycharityapp.model.User
import com.example.mycharityapp.model.DonationLog

@Composable
fun MyDonationsScreen(user: User, navController: NavController) {
    val viewModel: MyDonationsViewModel = viewModel()

    val logs = viewModel.logs
    val isLoading = viewModel.isLoading
    val errorMessage = viewModel.errorMessage

    LaunchedEffect(user.id) {
        Log.d("DEBUG", "MyDonationsScreen: user.id = ${user.id}")
        viewModel.loadLogs(user.id)
    }


    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Мої донати", style = MaterialTheme.typography.headlineSmall)

        Spacer(modifier = Modifier.height(16.dp))

        when {
            isLoading -> {
                CircularProgressIndicator()
            }
            errorMessage != null -> {
                Text(errorMessage ?: "Помилка", color = MaterialTheme.colorScheme.error)
            }
            logs.isEmpty() -> {
                Text("Схоже, ви ще не зробили жодного пожертвування.")
            }
            else -> {
                LazyColumn {
                    items(logs) { log: DonationLog ->
                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 6.dp)
                        ) {
                            Column(modifier = Modifier.padding(12.dp)) {
                                Text("ID збору: ${log.donationId}")
                                Text("Сума: ${log.amount} грн")
                                Text("Дата: ${log.date}")
                            }
                        }
                    }
                }
            }
        }
    }
}
