function generateImage() {
    const productName = document.getElementById("productName").value;
    const loader = document.getElementById("loader");
    const image = document.getElementById("generatedImage");
    const imageContainer = document.getElementById("imageContainer");
    const commentsContainer = document.getElementById("topCommentsScored");
    document.getElementById("resetWrapper").style.display = "block";

  
    loader.style.display = "block";
    imageContainer.style.display = "none";
    commentsContainer.style.display = "none";
  
    fetch(`/getData/${productName}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
          loader.style.display = "none";
          return;
        }
  
        // Show chart
        image.src = data.imagePath;
        image.onload = () => {
          imageContainer.style.display = "block";
          loader.style.display = "none";
        };
  
        // Show comments
        document.querySelector("#topPositiveScored .comment-card__text").innerText =
          data.topComments.highest_positive_comment;
        document.querySelector("#topNegativeScored .comment-card__text").innerText =
          data.topComments.lowest_negative_comment;
        commentsContainer.style.display = "block";
      })
      .catch(err => {
        alert("Something went wrong!");
        console.error(err);
        loader.style.display = "none";
      });
  }
  
  function resetSearch() {
    document.getElementById("productName").value = "";
    document.getElementById("resetWrapper").style.display = "none";

  
    // Hide and clear image
    const imgContainer = document.getElementById("imageContainer");
    const image = document.getElementById("generatedImage");
    imgContainer.style.display = "none";
    image.src = "";
  
    // Hide and clear comment cards
    const comments = document.getElementById("topCommentsScored");
    comments.style.display = "none";
  
    document.querySelector("#topPositiveScored .comment-card__text").innerText = "";
    document.querySelector("#topNegativeScored .comment-card__text").innerText = "";
  }
  