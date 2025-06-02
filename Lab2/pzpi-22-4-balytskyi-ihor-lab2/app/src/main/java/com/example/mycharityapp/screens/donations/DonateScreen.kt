package com.example.mycharityapp.screens.donations

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController

@Composable
fun DonateScreen(donationId: String, userId: String, navController: NavController) {
    val viewModel: DonateViewModel = viewModel()
    var amount by remember { mutableStateOf("") }

    val successMessage = viewModel.successMessage
    val errorMessage = viewModel.errorMessage

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("Задонатити", style = MaterialTheme.typography.headlineSmall)

        OutlinedTextField(
            value = amount,
            onValueChange = { amount = it },
            label = { Text("Сума (грн)") },
            modifier = Modifier.fillMaxWidth()
        )

        Button(
            onClick = {
                val intAmount = amount.toIntOrNull()
                if (intAmount != null && intAmount > 0) {
                    viewModel.donate(userId, donationId, intAmount)
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Надіслати")
        }

        successMessage?.let {
            Text(it, color = MaterialTheme.colorScheme.primary)
            LaunchedEffect(Unit) {
                kotlinx.coroutines.delay(1500)
                navController.popBackStack()
            }
        }

        errorMessage?.let {
            Text(it, color = MaterialTheme.colorScheme.error)
        }
    }
}
