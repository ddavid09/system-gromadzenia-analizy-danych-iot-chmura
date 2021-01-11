using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Devices;
using Domain.Devices;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesController : Controller
    {
        private readonly IMediator _mediator;
        
        public DevicesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Authorize(Policy = "AccessScope")]
        public async Task<ActionResult<List<DeviceResponse>>> GetAllDevices()
        {
            var owner = User?.Identity?.Name;
            return await _mediator.Send(new GetAll.Query(){Owner = owner});
        }
        
        [HttpPost]
        public async Task<ActionResult<DeviceResponse>> NewDevice(NewDevice.Command.DeviceParams commandDeviceParams)
        {
            return await _mediator.Send(new NewDevice.Command(){Owner = HttpContext.User?.Identity?.Name, deviceParams = commandDeviceParams});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit (string id, Edit.Command command)
        {
            command.DeviceId = id;
            return await _mediator.Send(command);
        } 

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteDevice(string id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }

        [HttpGet("{id}/download")]
        public async Task<IActionResult> DownloadConnectionFile(string id)
        {
            var fileContentBytes = await _mediator.Send(new Download.Query {Id = id});
            return new FileContentResult(fileContentBytes, "application/octet-stream")
            {
                FileDownloadName = $"{id}_connectionString.json"
            };
        }
    }
}