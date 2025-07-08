// Brown, Marcus
// 6.21.2025
// Project 1: ADF
// 3.6 Data Integration 2
// Synopsis: Provides input validation for numeric and string data.

using System;

public static class Validation // Validation class that provides methods for input validation
{
    public static string GetValStrng(string prompt) // Method to get a non-empty string input from the user
    {
        string choice;
        do
        {
            Console.Write($"{prompt}: ");
            choice = Console.ReadLine();
        } while (string.IsNullOrWhiteSpace(choice));
        return choice.Trim();
    }

    public static int GetValNumb(string prompt, int min = int.MinValue, int max = int.MaxValue) // Method to get a numeric input from the user within a specified range
    {
        int numb;
        string input;
        do // Loop until a valid integer input is provided within the specified range
        {
            Console.Write($"{prompt}: ");
            input = Console.ReadLine();
        } while (!int.TryParse(input, out numb) || numb < min || numb > max);
        return numb;
    }
}
