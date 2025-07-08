// Brown, Marcus
// 6.21.2025
// Project 1: ADF
// 3.6 Data Integration 2 (Updated: Username + Password Login)
// Synopsis: Manages application flow with simplified login (no ID required).

using System;
using System.IO;

public class App // Application class that manages user login and profile management
{
    private User _activeUser; // Active user object to store the currently logged-in user's information
    private bool _loggedIn; // Boolean flag to check if a user is logged in
    private Menu _menu; // Menu object to handle menu display and options
    private const string FilePath = "users.txt";

    public App() // Constructor that initializes the application, displays the main menu, and starts the selection process
    {
        _menu = new Menu();
        _loggedIn = false;
        ShowMainMenu();
        Selection();
    }

    private void ShowMainMenu() // Displays the main menu with options for creating a user, logging in, and viewing about information
    {
        _menu.Init("Main Menu", "Create User", "Login", "About");
        _menu.Display();
    }

    private void ShowUserMenu() // Displays the user menu with options for viewing about information, showing profile, and logging out
    {
        _menu.Init($"Welcome {_activeUser.Name}", "About", "Show Profile", "Logout");
        _menu.Display();
    }

    private void Selection() // Handles user input for menu selection and executes the corresponding actions based on whether the user is logged in or not
    {
        while (true)
        {
            int maxOption = _loggedIn ? 3 : 3;
            int choice = Validation.GetValNumb("Select a Menu Option", 0, maxOption); // Get user input for menu selection

            if (!_loggedIn) // If the user is not logged in, show options for creating a user or logging in
            {
                switch (choice)
                {
                    case 1:
                        CreateUser();
                        break;
                    case 2:
                        SignIn();
                        break;
                    case 3:
                        About();
                        break;
                    case 0:
                        Exit();
                        return;
                }
            }
            else
            {
                switch (choice) // If the user is logged in, show options for viewing about information, showing profile, or logging out
                {
                    case 1:
                        About();
                        break;
                    case 2:
                        ShowProfile();
                        break;
                    case 3:
                        Logout();
                        break;
                    case 0:
                        Exit();
                        return;
                }
            }
        }
    }

    private void CreateUser() // Creates a new user by prompting for a username and password, then saves it to a file
    {
        Console.Clear();
        string name = Validation.GetValStrng("Enter username");
        string password = Validation.GetValStrng("Enter password");

        _activeUser = new User(name, password);

        File.AppendAllText(FilePath, $"{name},{password}\n");

        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine($"User created successfully!");
        Console.ResetColor();
        Continue();
    }

    private void SignIn() // Allows a user to log in by checking the provided username and password against stored values in a file
    {
        if (!File.Exists(FilePath)) // Check if the user file exists
        {
            Console.WriteLine("No users exist. Please create one first.");
            Continue();
            return;
        }

        string username = Validation.GetValStrng("Enter username");
        string password = Validation.GetValStrng("Enter password");

        string[] lines = File.ReadAllLines(FilePath);
        foreach (var line in lines) // Read each line in the user file to check for a match
        {
            string[] parts = line.Split(',');
            if (parts.Length == 2 && parts[0] == username && parts[1] == password) // Check if the username and password match
            {
                _activeUser = new User(username, password);
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"Welcome {username}!");
                Console.ResetColor();
                _loggedIn = true;
                ShowUserMenu();
                Continue();
                return;
            }
        }

        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine("Invalid username or password.");
        Console.ResetColor();
        Continue();
    }

    private void Logout() // Logs out the current user by resetting the active user and logged-in status, then shows the main menu
    {
        _loggedIn = false;
        ShowMainMenu();
        Continue();
    }

    private void ShowProfile() // Displays the profile of the currently logged-in user, showing their username and password
    {
        Console.Clear();
        Console.WriteLine("=== USER PROFILE ===");
        Console.WriteLine($"Username: {_activeUser.Name}");
        Console.WriteLine($"Password: {_activeUser.Password}");
        Continue();
    }

    private void About() // Displays information about the application, such as its name and version
    {
        Console.Clear();
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("ShipIt App - Simplified Login Version");
        Console.ResetColor();
        Continue();
    }

    private void Exit() // Exits the application by clearing the console and displaying an exit message
    {
        Console.Clear();
        Console.WriteLine("Exiting...");
    }

    private void Continue() // Prompts the user to press any key to continue, then clears the console and shows the appropriate menu based on login status
    {
        Console.WriteLine("\nPress any key to continue...");
        Console.ReadKey();
        Console.Clear();
        if (_loggedIn)
            ShowUserMenu();
        else
            ShowMainMenu();
    }
}
