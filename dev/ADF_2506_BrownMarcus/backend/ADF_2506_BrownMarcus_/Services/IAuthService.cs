// Brown, Marcus
// 6.21.2025
// Project 1: ADF
// 3.6 Data Integration 2
// Synopsis: Authentication service interface for login operations.

using ADF_2506_BrownMarcus_.Models;

namespace ADF_2506_BrownMarcus_.Services
{
    public interface IAuthService
    {
        Task<User?> AuthenticateAsync(string username, string password);
        Task<bool> ValidateCredentialsAsync(string username, string password);
        Task UpdateLastLoginAsync(int userId);
    }
} 