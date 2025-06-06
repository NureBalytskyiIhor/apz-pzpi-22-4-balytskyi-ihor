package com.example.mycharityapp.screens.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.mycharityapp.model.User

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PaymentScreen(user: User, onBack: () -> Unit) {
    var country by remember { mutableStateOf("") }
    var cardNumber by remember { mutableStateOf("") }
    var expiration by remember { mutableStateOf("") }
    var cvc by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Top
    ) {
        Text("Оплата", style = MaterialTheme.typography.headlineSmall)

        Spacer(modifier = Modifier.height(24.dp))

        // Name
        Text("Name", style = MaterialTheme.typography.labelSmall)
        OutlinedTextField(
            value = user.name,
            onValueChange = {},
            enabled = false,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Country
        Text("Country", style = MaterialTheme.typography.labelSmall)
        OutlinedTextField(
            value = country,
            onValueChange = { country = it },
            placeholder = { Text("Select your country") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(24.dp))
        Text("Payment methods", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(12.dp))

        // Card number
        OutlinedTextField(
            value = cardNumber,
            onValueChange = { cardNumber = it },
            label = { Text("Card Number") },
            placeholder = { Text("1234 1234 1234 1234") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Expiration and CVC
        Row(modifier = Modifier.fillMaxWidth()) {
            OutlinedTextField(
                value = expiration,
                onValueChange = { expiration = it },
                label = { Text("Expiration Date") },
                placeholder = { Text("MM / YY") },
                modifier = Modifier.weight(1f).padding(end = 8.dp)
            )
            OutlinedTextField(
                value = cvc,
                onValueChange = { cvc = it },
                label = { Text("Security Code") },
                placeholder = { Text("CVC") },
                modifier = Modifier.weight(1f)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        Button(onClick = {
            // TODO: обробка платежу
        }, modifier = Modifier.fillMaxWidth()) {
            Text("Підтвердити оплату")
        }

        Spacer(modifier = Modifier.height(8.dp))

        TextButton(onClick = onBack, modifier = Modifier.align(Alignment.CenterHorizontally)) {
            Text("Назад")
        }
    }
}
