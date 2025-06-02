package com.example.mycharityapp.screens.mycollections

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreateDonationRequestScreen(userId: String, navController: NavController) {
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
        verticalArrangement = Arrangement.Top
    ) {
        Text("Формування заявки на збір", style = MaterialTheme.typography.headlineSmall)

        Spacer(modifier = Modifier.height(24.dp))

        OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            label = { Text("Назва збору") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(12.dp))

        OutlinedTextField(
            value = goal,
            onValueChange = { goal = it },
            label = { Text("Ціль збору (грн)") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(12.dp))

        OutlinedTextField(
            value = description,
            onValueChange = { description = it },
            label = { Text("Опис збору") },
            modifier = Modifier.fillMaxWidth(),
            minLines = 3
        )

        Spacer(modifier = Modifier.height(24.dp))

        Text("Прикріплення документів та фото", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(150.dp)
                .background(Color.LightGray),
            contentAlignment = Alignment.Center
        ) {
            Text("Поле для завантаження файлів")
        }

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = {
                val goalInt = goal.toIntOrNull()
                if (title.isNotBlank() && goalInt != null && description.isNotBlank()) {

                    viewModel.createDonation(title, goalInt, description, userId)
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Відправити заявку")
        }

        Spacer(modifier = Modifier.height(8.dp))

        TextButton(
            onClick = { navController.popBackStack() },
            modifier = Modifier.align(Alignment.CenterHorizontally)
        ) {
            Text("Назад")
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
