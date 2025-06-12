using AuthBackend.Data;
using AuthBackend.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace AuthBackend.Services
{
    public class AuthService
    {
        private readonly AuthDbContext _context;

        public AuthService(AuthDbContext context)
        {
            _context = context;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            // Check if username already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);
            
            if (existingUser != null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Username has been used, try another."
                };
            }

            // Hash password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Create new user
            var user = new User
            {
                Username = request.Username,
                PasswordHash = passwordHash
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                Success = true,
                Message = "Account created successfully! You can now login."
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Incorrect username/password"
                };
            }

            return new AuthResponse
            {
                Success = true,
                Message = "Login successful!",
                Token = "dummy-token" // For simplicity, using a dummy token
            };
        }
    }
} 