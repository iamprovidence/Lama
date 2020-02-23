using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.DataTransferObjects;
using Domains.ElasticsearchDocuments;

using AutoMapper;

using DataAccess.Interfaces;

using BusinessLogic.Interfaces;

namespace BusinessLogic.Services
{
    public class PhotoService : Abstract.PhotoServiceBase, IPhotoService
    {
        public PhotoService(
            IMapper mapper, 
            IAuthService authService,
            IElasticService elasticService, 
            IPhotoBlobStorage blobStorage, 
            IImageService imageService) 
            : base(mapper, authService, elasticService, blobStorage, imageService) { }

        public async Task<IEnumerable<PhotoListDTO>> GetPhotosAsync(string userId, string searchPayload)
        {
            IEnumerable<PhotoDocument> userPhotos = await _elasticService.GetPhotosAsync(userId, searchPayload);

            return userPhotos.OrderByDescending(p => p.UploadDate).Select(_mapper.Map<PhotoListDTO>);
        }

        public async Task<PhotoViewDTO> GetPhotoOrDefaultAsync(Guid photoId)
        {
            PhotoDocument userPhoto = await _elasticService.GetPhotoOrDefaultAsync(photoId);
            if (userPhoto == null) return null;

            return _mapper.Map<PhotoViewDTO>(userPhoto);
        }

        public async Task<IEnumerable<PhotoListDTO>> UploadPhotosAsync(IEnumerable<PhotoToUploadDTO> photosToUploadDTO)
        {
            // TODO: refactor this
            List<PhotoListDTO> createdPhotos = new List<PhotoListDTO>();

            foreach (PhotoToUploadDTO photo in photosToUploadDTO)
            {
                byte[] imageFile = _imageService.FromBase64String(photo.Base64Image);
                string contentType = _imageService.GetContentType(photo.Base64Image);
                string blobName = await _blobStorage.UploadFileAsync(imageFile, contentType);

                PhotoDocument photoDocument = _mapper.Map<PhotoDocument>(photo);
                SetPhotoValues(photoDocument, blobName);

                PhotoDocument createdPhoto = await _elasticService.CreateAsync(photoDocument);
                PhotoListDTO photoDTO = _mapper.Map<PhotoListDTO>(createdPhoto);

                createdPhotos.Add(photoDTO);
            }

            return createdPhotos;
        }

        // TODO: remove this
        private void SetPhotoValues(PhotoDocument photoDocument, string blobName)
        {
            photoDocument.UserId = _authService.GetCurrentUserId();

            photoDocument.OriginalBlobName = blobName;
            photoDocument.BlobName = blobName;
            photoDocument.Blob64Name = blobName;
            photoDocument.Blob256Name = blobName;
        }

        public Task MarkPhotosAsDeletedAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
        {
            return _elasticService.MarkPhotosAsDeletedAsync(photosToDelete);
        }

    }
}
