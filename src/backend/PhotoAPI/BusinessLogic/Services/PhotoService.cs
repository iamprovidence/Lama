using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.DataTransferObjects;
using Domains.ElasticsearchDocuments;

using AutoMapper;

using DataAccess.Interfaces;

namespace BusinessLogic.Services
{
    public class PhotoService : Interfaces.IPhotoService
    {
        private readonly IMapper _mapper;
        private readonly IElasticService _elasticService;
        private readonly IPhotoBlobStorage _blobStorage;
        private readonly IImageService _imageService;

        public PhotoService(
            IMapper mapper, 
            IElasticService elasticService, 
            IPhotoBlobStorage blobStorage, 
            IImageService imageService)
        {
            _mapper = mapper;
            _elasticService = elasticService;
            _blobStorage = blobStorage;
            _imageService = imageService;
        }

        public async Task<IEnumerable<PhotoListDTO>> GetPhotosAsync(int userId)
        {
            IEnumerable<PhotoDocument> userPhotos = await _elasticService.GetPhotosAsync(userId);

            return userPhotos.Select(_mapper.Map<PhotoListDTO>);
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
            photoDocument.UserId = 1;

            photoDocument.OriginalBlobName = blobName;
            photoDocument.BlobName = blobName;
            photoDocument.Blob64Name = blobName;
            photoDocument.Blob256Name = blobName;
        }
    }
}
