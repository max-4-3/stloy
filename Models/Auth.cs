namespace back_end.Models
{
    public class UserConfigResponse
    {
        public required Guid UserId { get; set; }
        public required DateTime RefreshTokenValidUntil { get; set; }
    }

    public class TokenResponse
    {
        public required string AccessToken { get; set; }
        public required string RefreshToken { get; set; }
    }

    public class RefreshTokenRequest
    {
        public Guid UserId { get; set; }
        public required string RefreshToken { get; set; }
    }
}
