FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 1700
EXPOSE 1701

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /src
COPY Aggregator /src/source
WORKDIR /src/source
RUN dotnet publish -c Release -o app

FROM base AS final
COPY --from=build /src/source/Aggregator/app .
ENTRYPOINT ["dotnet", "Aggregator.dll"]