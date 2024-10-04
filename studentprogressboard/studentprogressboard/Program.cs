using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using studentprogressboard.Data;
using studentprogressboard.Data.Repositories.Base;
using studentprogressboard.Data.Repository.Interfaces;
using studentprogressboard.Logic.Base;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Logic.Services;
using studentprogressboard.Model;
using System.Text;
using Microsoft.Identity.Web;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Web.UI;
using Microsoft.IdentityModel.Logging;
IdentityModelEventSource.LogCompleteSecurityArtifact = true;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "AllowOrigin",
        builder =>
        {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        });
});

builder.Services.AddControllers();



builder.Services.AddControllersWithViews()
    .AddMicrosoftIdentityUI();


builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseInMemoryDatabase("Studentboarddb");
    options.UseLazyLoadingProxies();
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddIdentity<Student, IdentityRole<int>>(option =>
{
    option.SignIn.RequireConfirmedAccount = false;
    option.Password.RequireDigit = false;
    option.Password.RequiredLength = 2;
    option.Password.RequireNonAlphanumeric = false;
    option.Password.RequireUppercase = false;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();




builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudiences = new List<string>
        {
            "http://www.security.org",
        },
        ValidIssuers = new List<string>
        {
            "http://www.security.org",
        },

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EzEgyMegfeleloenHosszuEsVeletlenszeruKulcs"))
    };
})
.AddJwtBearer("O365Scheme", options =>
{
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine("Authentication failed: " + context.Exception.Message);
            return Task.CompletedTask;
        },
        OnChallenge = context =>
        {
            if (context.AuthenticateFailure != null)
            {
                Console.WriteLine("Authentication challenge failed: " + context.AuthenticateFailure.Message);
            }
            return Task.CompletedTask;
        }
    };
    options.SaveToken = true;
    options.RequireHttpsMetadata = true;
    options.Authority = "https://login.microsoftonline.com/1d6a56fa-705a-4bbc-8004-67a21d5e9b97";
    options.Audience = "0a5f9277-d1d9-45b7-8b43-84502e164861"; 
    
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidIssuers = new List<string>
        {
            "https://sts.windows.net/1d6a56fa-705a-4bbc-8004-67a21d5e9b97/"
        },
    };
    options.MetadataAddress = $"https://login.microsoftonline.com/1d6a56fa-705a-4bbc-8004-67a21d5e9b97/v2.0/.well-known/openid-configuration";


});
builder.Services.AddLogging(loggingBuilder => {
    loggingBuilder.AddConsole();
    loggingBuilder.AddDebug();
});



IdentityModelEventSource.ShowPII = true;
builder.Services.AddAuthorization();

builder.Services.AddSignalR();
builder.Services.AddTransient<ApplicationDbContext>();

builder.Services.AddTransient<IRepository<Student>, Repository<Student>>();
builder.Services.AddTransient<IRepository<StudentCourse>, Repository<StudentCourse>>();
builder.Services.AddTransient<IRepository<Course>, Repository<Course>>();
builder.Services.AddTransient<IRepository<Training>, Repository<Training>>();
builder.Services.AddTransient<IRepository<Semester>, Repository<Semester>>();

builder.Services.AddTransient<ILogicService<Student>, LogicServiceBase<Student>>();
builder.Services.AddTransient<ILogicService<StudentCourse>, LogicServiceBase<StudentCourse>>();
builder.Services.AddTransient<ILogicService<Course>, LogicServiceBase<Course>>();
builder.Services.AddTransient<ILogicService<Training>, LogicServiceBase<Training>>();
builder.Services.AddTransient<ILogicService<Semester>, LogicServiceBase<Semester>>();

builder.Services.AddTransient<IStudentCourseService, StudentCourseService>();
builder.Services.AddTransient<ICourseService, CourseService>();
builder.Services.AddTransient<IStudentService, StudentService>();
builder.Services.AddTransient<ITrainingService, TrainingService>();
builder.Services.AddTransient<ISemesterService, SemesterService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
