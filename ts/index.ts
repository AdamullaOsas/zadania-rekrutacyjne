const imageUpload = document.getElementById("imageUpload") as HTMLInputElement;

const convertGrayscale = document.getElementById(
    "convertGrayscale"
) as HTMLButtonElement;

const uploadedImage = document.getElementById(
    "uploadedImage"
) as HTMLImageElement;

const grayscaleImage = document.getElementById(
    "grayscaleImage"
) as HTMLCanvasElement;

imageUpload.addEventListener("change", () => {
    const file = imageUpload.files?.item(0);
    // console.log(file);
    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            uploadedImage.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
});

convertGrayscale.addEventListener("click", () => {
    if (uploadedImage.src) {
        const context = grayscaleImage.getContext("2d");

        grayscaleImage.width = uploadedImage.width;
        grayscaleImage.height = uploadedImage.height;
        console.log(context);
        context?.drawImage(uploadedImage, 0, 0);

        const imageData = context?.getImageData(
            0,
            0,
            grayscaleImage.width,
            grayscaleImage.height
        ).data;

        if (imageData) {
            for (let i = 0; i < imageData!.length; i += 4) {
                const gray =
                    0.299 * imageData![i] +
                    0.587 * imageData![i + 1] +
                    0.114 * imageData![i + 2];

                imageData![i] = imageData![i + 1] = imageData![i + 2] = gray;
            }
            const newImageData = new ImageData(
                imageData!,
                grayscaleImage.width,
                grayscaleImage.height
            );

            context.putImageData(newImageData, 0, 0);
        }
    } else {
        alert("Dodaj obraz ;))");
    }
});
