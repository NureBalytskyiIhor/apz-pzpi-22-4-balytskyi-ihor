package com.example.mycharityapp.screens.shared

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.mycharityapp.model.Donation

@Composable
fun DonationCard(donation: Donation, onDonateClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(donation.title, style = MaterialTheme.typography.titleLarge)
            Text("Ціль – ${donation.goal} грн", style = MaterialTheme.typography.bodyMedium)
            Spacer(modifier = Modifier.height(8.dp))
            Button(onClick = onDonateClick) {
                Text("Задонатити")
            }
        }
    }
}