package com.example.mycharityapp.screens.mycollections

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController

@Composable
fun CreateDonationScreen(userId: String, navController: NavController) {
    val viewModel: CreateDonationViewModel = viewModel()

    var title by remember { mutableStateOf("") }
    var goal by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }

    val successMessage = viewModel.successMessage
    val errorMessage = viewModel.errorMessage

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("Формування заявки на збір", style = MaterialTheme.typography.headlineSmall)

        OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            label = { Text("Назва збору") },
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = goal,
            onValueChange = { goal = it },
            label = { Text("Ціль збору (грн)") },
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = description,
            onValueChange = { description = it },
            label = { Text("Опис збору") },
            modifier = Modifier.fillMaxWidth(),
            minLines = 3
        )

        Button(
            onClick = {
                val goalInt = goal.toIntOrNull()
                if (title.isNotBlank() && goalInt != null && description.isNotBlank()) {
                    viewModel.createDonation(title, goalInt, description, userId)
                }
            },
            modifier = Modifier.align(Alignment.End)
        ) {
            Text("Створити")
        }

        successMessage?.let {
            Text(it, color = MaterialTheme.colorScheme.primary)
            LaunchedEffect(Unit) {
                kotlinx.coroutines.delay(2000)
                navController.popBackStack()
            }
        }

        errorMessage?.let {
            Text(it, color = MaterialTheme.colorScheme.error)
        }
    }
}
