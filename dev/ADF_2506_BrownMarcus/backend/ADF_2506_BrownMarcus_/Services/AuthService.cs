// Brown, Marcus
// 6.21.2025
// Project 1: ADF
// 3.6 Data Integration 2
// Synopsis: Authentication service implementation for login operations.

using Microsoft.EntityFrameworkCore;
using ADF_2506_BrownMarcus_.Data;
using ADF_2506_BrownMarcus_.Models;

namespace ADF_2506_BrownMarcus_.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> AuthenticateAsync(string username, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Name == username && u.Password == password && u.IsActive);

            if (user != null)
            {
                await UpdateLastLoginAsync(user.Id);
            }

            return user;
        }

        public async Task<bool> ValidateCredentialsAsync(string username, string password)
        {
            return await _context.Users
                .AnyAsync(u => u.Name == username && u.Password == password && u.IsActive);
        }

        public async Task UpdateLastLoginAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.LastLoginAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }
    }
} 