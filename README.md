# Config
Make changes into:
- `./appsettings.json`:
    - `User`
    - `Server`
    - `Database`
    - `Password`
-  `./docker-compose.yml`:
    - `MSSQL_SA_PASSWORD`
    - `MSSQL_PID`

# QuickStart

## Start Docker
```bash
docker compose up -d    # -d -> detech
```

## [Config](#Config) 

## Migrate Database
```bash
dotnet el migration add Stloy
```

## Update Database
```bash
dotnet el database update
```

## Start the server
```bash
dotnet run
```
