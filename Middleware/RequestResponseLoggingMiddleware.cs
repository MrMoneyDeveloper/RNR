using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Text;
using System.Threading.Tasks;

public class RequestResponseLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestResponseLoggingMiddleware> _logger;

    public RequestResponseLoggingMiddleware(RequestDelegate next, ILogger<RequestResponseLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        // Log request
        context.Request.EnableBuffering();
        var requestBody = await ReadRequestBody(context.Request);
        _logger.LogInformation($"Incoming request: {context.Request.Method} {context.Request.Path} {requestBody}");

        // Log response
        var originalBodyStream = context.Response.Body;
        using (var responseBody = new MemoryStream())
        {
            context.Response.Body = responseBody;
            await _next(context);
            var responseBodyText = await ReadResponseBody(context.Response);
            _logger.LogInformation($"Outgoing response: {context.Response.StatusCode} {responseBodyText}");
            await responseBody.CopyToAsync(originalBodyStream);
        }
    }

    private async Task<string> ReadRequestBody(HttpRequest request)
    {
        request.Body.Position = 0;
        var buffer = new byte[Convert.ToInt32(request.ContentLength)];
        await request.Body.ReadAsync(buffer, 0, buffer.Length);
        request.Body.Position = 0;
        return Encoding.UTF8.GetString(buffer);
    }

    private async Task<string> ReadResponseBody(HttpResponse response)
    {
        response.Body.Seek(0, SeekOrigin.Begin);
        var text = await new StreamReader(response.Body).ReadToEndAsync();
        response.Body.Seek(0, SeekOrigin.Begin);
        return text;
    }
}
