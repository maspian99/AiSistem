function generate() {
    let youtubeUrl = document.getElementById("youtubeUrl").value;
    if (!youtubeUrl) {
        alert("Masukkan URL YouTube terlebih dahulu!");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");
    let progress = 0;
    let progressBar = document.getElementById("progress-bar-fill");
    let progressText = document.getElementById("progress");

    let interval = setInterval(() => {
        progress += 10;
        progressText.innerText = progress + "%";
        progressBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            document.getElementById("loading").classList.add("hidden");

            // Tampilkan thumbnail
            document.getElementById("thumbnail").innerHTML = `<img src="https://via.placeholder.com/300" alt="Thumbnail">`;

            // Tampilkan clips
            let clipsContainer = document.getElementById("clips");
            clipsContainer.innerHTML = "<h2>Clips Terpilih</h2>";

            for (let i = 1; i <= 3; i++) {
                clipsContainer.innerHTML += `
                    <div class="clip">
                        <p>Clip ${i} (Moments terbaik)</p>
                        <video width="250" controls>
                            <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4">
                        </video>
                        <button class="download-btn" onclick="downloadClip(${i})">Download</button>
                    </div>
                `;
            }
        }
    }, 500);
}

function downloadClip(clipNumber) {
    let a = document.createElement("a");
    a.href = "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"; // Ganti dengan link asli
    a.download = `Clip-${clipNumber}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
