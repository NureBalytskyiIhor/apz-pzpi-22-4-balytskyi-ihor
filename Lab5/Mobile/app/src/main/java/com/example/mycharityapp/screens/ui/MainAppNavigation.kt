package com.example.mycharityapp.screens.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.*
import com.example.mycharityapp.model.User
import com.example.mycharityapp.screens.donations.DonateScreen
import com.example.mycharityapp.screens.donations.DonationDetailsScreen
import com.example.mycharityapp.screens.donations.DonationsScreen
import com.example.mycharityapp.screens.mycollections.AddNewsScreen
import com.example.mycharityapp.screens.mycollections.CreateDonationRequestScreen
import com.example.mycharityapp.screens.mycollections.CreateDonationScreen
import com.example.mycharityapp.screens.mycollections.MyCreatedDonationsScreen
import com.example.mycharityapp.screens.mydonations.MyDonationsScreen
import com.example.mycharityapp.screens.profile.ProfileScreen
import com.example.mycharityapp.screens.shared.BottomNavItem
import com.example.mycharityapp.screens.shared.BottomNavigationBar

@Composable
fun MainAppNavigation(user: User) {
    val navController = rememberNavController()

    Scaffold(
        bottomBar = {
            BottomNavigationBar(navController, user)
        }
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = BottomNavItem.Donations.route,
            modifier = Modifier.padding(padding)
        ) {
            composable(BottomNavItem.Donations.route) {
                DonationsScreen(navController)
            }

            composable("my_donations") {
                MyDonationsScreen(user, navController)
            }

            composable(BottomNavItem.Profile.route) {
                ProfileScreen(user)
            }

            composable("details/{donationId}") { backStackEntry ->
                val donationId = backStackEntry.arguments?.getString("donationId") ?: return@composable
                DonationDetailsScreen(donationId, navController, user)
            }

            composable("payment") {
                PaymentScreen(user) {
                    navController.popBackStack()
                }
            }

            composable(BottomNavItem.MyCreatedDonations.route) {
                MyCreatedDonationsScreen(user, navController)
            }

            composable("create_donation_form") {
                CreateDonationRequestScreen(user.id, navController)
            }

            composable("add_news/{donationId}") { backStackEntry ->
                val donationId = backStackEntry.arguments?.getString("donationId") ?: return@composable
                AddNewsScreen(donationId, navController)
            }

            composable("create_donation") {
                CreateDonationScreen(user.id, navController)
            }

            composable("payment/{donationId}") { backStackEntry ->
                val donationId = backStackEntry.arguments?.getString("donationId") ?: return@composable
                DonateScreen(donationId, user.id, navController)
            }
        }
    }
}
