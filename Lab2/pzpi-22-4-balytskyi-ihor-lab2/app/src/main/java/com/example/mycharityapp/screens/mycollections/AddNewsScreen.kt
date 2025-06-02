package com.example.mycharityapp.screens.mycollections

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import androidx.compose.ui.Alignment


@Composable
fun AddNewsScreen(donationId: String, navController: NavController) {
    val viewModel: AddNewsViewModel = viewModel()

    var title by remember { mutableStateOf("") }
    var content by remember { mutableStateOf("") }

    val success = viewModel.success
    val error = viewModel.error

    Column(modifier = Modifier
        .fillMaxSize()
        .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("Додати новину", style = MaterialTheme.typography.headlineSmall)

        OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            label = { Text("Заголовок") },
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = content,
            onValueChange = { content = it },
            label = { Text("Текст новини") },
            modifier = Modifier
                .fillMaxWidth()
                .height(150.dp)
        )

        Button(
            onClick = {
                if (title.isNotBlank() && content.isNotBlank()) {
                    viewModel.sendNews(donationId, title, content)
                }
            },
            modifier = Modifier.align(Alignment.End)
        ) {
            Text("Опублікувати")
        }

        success?.let {
            Text(it, color = MaterialTheme.colorScheme.primary)
            LaunchedEffect(Unit) {
                kotlinx.coroutines.delay(1500)
                navController.popBackStack()
            }
        }

        error?.let {
            Text(it, color = MaterialTheme.colorScheme.error)
        }
    }
}
