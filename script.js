document.getElementById("generateBtn").addEventListener("click", function() {
    let videoUrl = document.getElementById("videoInput").value;
    let clipDuration = document.getElementById("clipDuration").value;

    if (!videoUrl) {
        alert("Masukkan URL YouTube terlebih dahulu!");
        return;
    }

    document.getElementById("loadingBar").classList.remove("hidden");
    document.getElementById("progressPercent").innerText = "0%";
    document.getElementById("progressFill").style.width = "0%";

    let progress = 0;
    let interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            processVideo(videoUrl, clipDuration);
        } else {
            progress += 10;
            document.getElementById("progressPercent").innerText = progress + "%";
            document.getElementById("progressFill").style.width = progress + "%";
        }
    }, 500);
});

function processVideo(videoUrl, clipDuration) {
    // Simulasi pengambilan thumbnail
    let videoId = extractVideoId(videoUrl);
    let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    document.getElementById("videoThumbnail").src = thumbnailUrl;
    document.getElementById("thumbnailPreview").classList.remove("hidden");

    setTimeout(() => {
        generateClips(videoUrl, clipDuration);
    }, 1000);
}

function generateClips(videoUrl, clipDuration) {
    let clipsContainer = document.getElementById("clipsContainer");
    let clipsList = document.getElementById("clipsList");
    clipsList.innerHTML = "";
    clipsContainer.classList.remove("hidden");

    for (let i = 0; i < 3; i++) { // Buat 3 klip sebagai contoh
        let startTime = i * clipDuration;
        let clipTitle = `Momen ${i + 1}`;

        let clipElement = document.createElement("div");
        clipElement.className = "clip";
        clipElement.innerHTML = `
            <h3>${clipTitle}</h3>
            <video controls>
                <source src="clips/clip${i + 1}.mp4" type="video/mp4">
            </video>
            <a href="clips/clip${i + 1}.mp4" download="clip${i + 1}.mp4" class="download">Download</a>
        `;

        clipsList.appendChild(clipElement);
    }

    document.getElementById("loadingBar").classList.add("hidden");
}

// Fungsi untuk mengambil ID video dari URL YouTube
function extractVideoId(url) {
    let match = url.match(/(?:youtube\.com\/(?:[^\/]+\/[^\/]+|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
          }
