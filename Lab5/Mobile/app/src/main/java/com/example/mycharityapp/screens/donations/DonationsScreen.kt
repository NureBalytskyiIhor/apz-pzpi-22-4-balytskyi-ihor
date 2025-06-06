package com.example.mycharityapp.screens.donations

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.mycharityapp.screens.shared.DonationCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DonationsScreen(navController: NavController) {
    val viewModel: DonationsViewModel = viewModel()
    val donations = viewModel.donations
    val isLoading = viewModel.isLoading
    val errorMessage = viewModel.errorMessage

    var searchQuery by remember { mutableStateOf("") }
    var sortDescending by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        viewModel.loadDonations()
    }

    val filtered = donations
        .filter { it.title.contains(searchQuery, ignoreCase = true) }
        .let {
            if (sortDescending) it.sortedByDescending { d -> d.timestamp }
            else it.sortedBy { d -> d.timestamp }
        }

    Column(modifier = Modifier.padding(16.dp)) {
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            label = { Text("Пошук зборів") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        Button(
            onClick = { sortDescending = !sortDescending },
            modifier = Modifier.align(Alignment.End)
        ) {
            Text(if (sortDescending) "Сортувати: нові спочатку" else "Сортувати: старі спочатку")
        }

        Spacer(modifier = Modifier.height(8.dp))

        when {
            isLoading -> {
                CircularProgressIndicator()
            }
            errorMessage != null -> {
                Text(
                    text = errorMessage ?: "Сталася помилка",
                    color = MaterialTheme.colorScheme.error
                )
            }
            else -> {
                LazyColumn {
                    items(filtered) { donation ->
                        DonationCard(donation) {
                            navController.navigate("details/${donation.id}")
                        }
                    }
                }
            }
        }
    }
}
