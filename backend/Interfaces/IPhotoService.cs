using CloudinaryDotNet.Actions;

namespace backend.Interfaces;

public interface IPhotoService
{
    Task<ImageUploadResult> AddPhotoAsync(IFormFile file);

    Task<DeletionResult> DeletePhtoAsync(string publicId);
}