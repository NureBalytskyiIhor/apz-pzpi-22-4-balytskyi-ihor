package com.example.mycharityapp.screens.shared

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.example.mycharityapp.model.User

@Composable
fun BottomNavigationBar(navController: NavController, user: User) {
    val items = buildList {
        add(BottomNavItem.Donations)
        add(BottomNavItem.MyDonations)
        if (user.isVerified) add(BottomNavItem.MyCreatedDonations)
        add(BottomNavItem.Profile)
    }

    val navBackStackEntry = navController.currentBackStackEntryAsState().value
    val currentRoute = navBackStackEntry?.destination?.route

    NavigationBar {
        items.forEach { item ->
            NavigationBarItem(
                selected = currentRoute == item.route,
                onClick = {
                    navController.navigate(item.route) {
                        popUpTo(navController.graph.startDestinationId) { saveState = true }
                        launchSingleTop = true
                        restoreState = true
                    }
                },
                icon = {},
                label = { Text(item.label) }
            )
        }
    }
}