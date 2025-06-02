package com.example.mycharityapp.screens.donations

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

@Composable
fun DonationDetailsScreen(
    donationId: String,
    navController: NavController,
    user: User
) {
    val viewModel: DonationsViewModel = viewModel()
    val donations = viewModel.donations
    val donation = donations.find { it.id == donationId }

    if (donation == null) {
        Text("Збір не знайдено")
        return
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(donation.title, style = MaterialTheme.typography.headlineSmall)
        Spacer(modifier = Modifier.height(8.dp))
        Text("Мета: ${donation.goal} грн", style = MaterialTheme.typography.bodyMedium)
        Text("Зібрано: ${donation.raised} грн", style = MaterialTheme.typography.bodyMedium)
        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = {
                navController.navigate("payment/${donation.id}")
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Задонатити")
        }

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedButton(
            onClick = { navController.popBackStack() },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Назад до зборів")
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text("Оновлення:", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))

        if (donation.news.isEmpty()) {
            Text("Поки що немає новин")
        } else {
            LazyColumn {
                items(donation.news) { news ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text(news.date, style = MaterialTheme.typography.labelSmall)
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(news.content)
                        }
                    }
                }
            }
        }

        if (donation.creatorId == user.id) {
            Spacer(modifier = Modifier.height(16.dp))
            Button(
                onClick = {
                    navController.navigate("add_news/${donation.id}")
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Додати новину")
            }
        }
    }
}
