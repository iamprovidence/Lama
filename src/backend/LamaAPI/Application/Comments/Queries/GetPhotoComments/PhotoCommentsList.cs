﻿namespace Application.Comments.Queries.GetPhotoComments
{
    public class PhotoCommentsList
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public System.DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
    }
}