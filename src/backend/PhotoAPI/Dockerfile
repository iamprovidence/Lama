FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 2710
EXPOSE 2711

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /src
COPY PhotoAPI/ /src/source
COPY ./Shared/ Shared/
WORKDIR /src/source
RUN dotnet publish -c Release -o app

FROM base AS final
COPY --from=build /src/source/API/app .
ENTRYPOINT ["dotnet", "API.dll"]