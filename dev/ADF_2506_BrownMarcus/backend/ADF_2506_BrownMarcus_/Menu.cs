// Brown, Marcus
// 6.21.2025
// Project 1: ADF
// 3.6 Data Integration 2
// Synopsis: Displays dynamic, color-formatted menu options.

using System;
using System.Collections.Generic;

public class Menu 
{
    private string _title; 
    private List<string> _menuItems;

    public void Init(string title, params string[] items) // Initializes the menu with a title and a variable number of items
    {
        _title = title;
        _menuItems = new List<string>(items);
    }

    public void Display() // Displays the menu with a title and items
    {
        Console.Clear();
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("===================================");
        Console.WriteLine($" {_title.ToUpper()}");
        Console.WriteLine("===================================");
        Console.ResetColor();

        for (int i = 0; i < _menuItems.Count; i++) // Displays each menu item with its index
        {
            Console.WriteLine($" [{i + 1}] {_menuItems[i]}");
        }

        Console.WriteLine("\n [0] Exit");
        Console.WriteLine("-------------------------");
    }
}
