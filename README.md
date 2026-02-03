# Config
Make changes into:
- `./appsettings.json`:
    - `User`
    - `Server`
    - `Database`
    - `Password`
-  `./docker-compose.yml`:
    - `container_name`
    - `MSSQL_SA_PASSWORD`
    - `MSSQL_PID`

Add Admin User:
```bash
docker exec "$container_name" /opt/mssql-tools18/bin/sqlcmd -C -U "$user" -P "$MSSQL_SA_PASSWORD" -Q "use [$Database]; insert into [Users] ([Id], [Name], [Email], [HashedPassword], [Roles], [RefreshToken], [RefreshTokenExpiryTime]) Values ( newid(), $name, $email, $pass, 'Admin', null, null);"
```

# QuickStart

## Start Docker
```bash
docker compose up -d    # -d -> detech
```

## [Config](#Config) 

## Migrate Database
```bash
dotnet ef migration add Stloy
```

## Update Database
```bash
dotnet ef database update
```

## Start the server
```bash
dotnet run
```

# REFERENCES
[JWT Authentication](https://youtu.be/6EEltKS8AwA?si=wgon68uHdWIDHqPi)
