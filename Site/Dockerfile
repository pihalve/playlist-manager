FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 57462
EXPOSE 44376

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["PlaylistManager/PlaylistManager.csproj", "PlaylistManager/"]
COPY ["Site/Site.csproj", "Site/"]
RUN dotnet restore "Site/Site.csproj"
COPY . ./
WORKDIR /src/Site
RUN dotnet build "Site.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Site.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Site.dll"]