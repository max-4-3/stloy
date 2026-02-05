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
Run with `create` argument:
```bash
dotnet run create
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
