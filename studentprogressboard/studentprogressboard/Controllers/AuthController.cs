using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;
using studentprogressboard.Model.ViewModells;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Data;

namespace studentprogressboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<Student> _userManager;
        private readonly IStudentService studentService;

        public AuthController(UserManager<Student> userManager, IStudentService studentService)
        {
            _userManager = userManager;
            this.studentService = studentService ?? throw new ArgumentNullException(nameof(studentService));
        }




        [HttpPost("Microsoft")]
        public async Task<IActionResult> O365Login([FromBody] MicrosoftLoginModel model)
        {
            string email = GetEmailFromToken(model.Token);
            var user = await _userManager.FindByEmailAsync(email.ToUpper());
            
            if (user == null)
            {
                return Unauthorized();
            }
            return await GenerateToken(user);
        }

        [NonAction]
        private string GetEmailFromToken(string token)
        {
            try
            {
                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = jwtTokenHandler.ReadJwtToken(token);

                // Retrieve the email claim from the token
                var emailClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "upn")?.Value;

                if (emailClaim != null)
                {
                    return emailClaim;
                }
                else
                {
                    throw new Exception("Email claim not found in token.");
                }
            }
            catch (Exception ex)
            {
                // Handle the exception, such as logging it
                Console.WriteLine($"Error decoding token: {ex.Message}");
                return null;
            }
        }

        [NonAction]
        private async Task<IActionResult> GenerateToken(Student user)   
        {
            var claim = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };
            if (user.UserName == "admin")
            {
                claim.Add(new Claim(ClaimTypes.Role, "Admin"));
            }else claim.Add(new Claim(ClaimTypes.Role, "Student"));

            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EzEgyMegfeleloenHosszuEsVeletlenszeruKulcs"));
            var token = new JwtSecurityToken(
                issuer: "http://www.security.org", audience: "http://www.security.org",
                claims: claim, expires: DateTime.Now.AddMinutes(60),
                signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)

            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            });
        }


        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            //var hashedPassword = _userManager.PasswordHasher.HashPassword(user, model.Password);
            //var verificationResult = _userManager.PasswordHasher.VerifyHashedPassword(user, hashedPassword, model.Password);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
               return await GenerateToken(user);
            }
            return Unauthorized();
        }

        [HttpPut]
        public async Task<IActionResult> InsertUser([FromBody] RegisterModel model)
        {
            var user = new Student()
            {
                Email = model.UserName,
                UserName = model.UserName,
                NormalizedUserName = model.UserName.ToUpper(),
                EmailConfirmed = true,
                NormalizedEmail = model.UserName.ToUpper(),
                TrainingId = model.TrainingId,
                Name = model.Name,
                NeptunCode = model.NeptunCode,
                YearOfAdministration = model.YearOfAdministration,
                DateOfBirth = model.DateOfBirth,
                Address = model.Address,
                Nationality = model.Nationality,
                MothersName = model.MothersName,
                PasswordHash = model.Password,
                Sex = model.Sex,
            };
            await _userManager.CreateAsync(user);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetUserInfos()
        {
            var user = _userManager.Users.FirstOrDefault(t => t.UserName == this.User.Identity.Name);
            
            if (user != null)
            {
                var xd = await _userManager.GetRolesAsync(user);
                return Ok(new
                {
                    neptunKod = user.Id,
                    UserName = user.UserName,
                    Roles = await _userManager.GetRolesAsync(user)
                });
            }
            return Unauthorized();
        }


    }
}
