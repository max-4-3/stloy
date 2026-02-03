namespace back_end.Models
{
    public class UserBase
    {
        public required string Name { get; set; }

        override public string ToString()
        {
            return $"[Base] Name = {Name}";
        }
    }

    public class UserResponse : UserBase
    {
        public Guid Id { get; set; }
        public required string Email { get; set; }

        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }

        override public string ToString()
        {
            return $"[DB] Name = {Name}; Email = {Email}; RefreshToken = {RefreshToken}; RefreshTokenExpiryTime = {RefreshTokenExpiryTime}";
        }
    }

    public class UserDB : UserBase
    {
        public Guid Id { get; set; }
        public required string Email { get; set; }
        public string HashedPassword { get; set; } = string.Empty;
        public required string Roles { get; set; }

        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }

        override public string ToString()
        {
            return $"[DB] Name = {Name}; Email = {Email}; HashedPassword = {HashedPassword}; Roles = {Roles}; RefreshToken = {RefreshToken}; RefreshTokenExpiryTime = {RefreshTokenExpiryTime}";
        }
    }

    public class UserLogin : UserBase
    {
        public required string Password { get; set; }
        public required string Email { get; set; }

        override public string ToString()
        {
            return $"[Login] Name = {Name}; Password = {Password}; Email = {Email}";
        }
    }
}
