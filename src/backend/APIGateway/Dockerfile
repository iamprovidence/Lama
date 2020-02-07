FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /src
COPY / /src/source
WORKDIR /src/source
RUN dotnet publish -c Release -o app

FROM base AS final
COPY --from=build /src/source/APIGateway/app .
ENTRYPOINT ["dotnet", "APIGateway.dll"]