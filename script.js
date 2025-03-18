const OPENAI_API_KEY = "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"; // Masukkan API Key-mu di sini
async function generateClips() {
    let url = document.getElementById("youtubeUrl").value;
    let duration = document.getElementById("clipDuration").value;
    let progressBar = document.querySelector(".progress");
    let progressValue = document.getElementById("progressValue");
    let resultsDiv = document.getElementById("results");

    if (!url) {
        alert("Masukkan URL YouTube!");
        return;
    }

    document.getElementById("progress").classList.remove("hidden");
    progressValue.innerText = "0%";
    progressBar.style.width = "0%";

    let simulatedProgress = 0;
    let progressInterval = setInterval(() => {
        simulatedProgress += 10;
        progressValue.innerText = simulatedProgress + "%";
        progressBar.style.width = simulatedProgress + "%";

        if (simulatedProgress >= 100) {
            clearInterval(progressInterval);
        }
    }, 500);

    // Simulasi API OpenAI untuk memilih klip terbaik
    setTimeout(async () => {
        document.getElementById("progress").classList.add("hidden");
        resultsDiv.classList.remove("hidden");
        resultsDiv.innerHTML = `<h2>Klip yang dihasilkan:</h2>`;

        for (let i = 1; i <= 5; i++) {
            let title = `Klip AI ${i}`;
            let videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // Contoh video

            let clipHtml = `
                <div class="clip">
                    <h3>${title}</h3>
                    <video controls>
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                    <a href="${videoUrl}" download="clip_${i}.mp4">
                        <button>Download</button>
                    </a>
                </div>
            `;
            resultsDiv.innerHTML += clipHtml;
        }
    }, 5000); // Simulasi 5 detik
}