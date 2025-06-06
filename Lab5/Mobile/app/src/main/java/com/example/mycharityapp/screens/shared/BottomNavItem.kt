package com.example.mycharityapp.screens.shared

sealed class BottomNavItem(val route: String, val label: String) {
    object Donations : BottomNavItem("donations", "Всі збори")
    object MyDonations : BottomNavItem("my_donations", "Мої донати")
    object Profile : BottomNavItem("profile", "Профіль")
    object MyCreatedDonations : BottomNavItem("my_created_donations", "Мої збори")
}