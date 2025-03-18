const OPENAI_API_KEY = "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"; // Ganti dengan API Key OpenAI

async function processVideo() {
    let url = document.getElementById("youtube-url").value;
    let duration = document.getElementById("clip-duration").value;
    let loading = document.getElementById("loading");
    let progressText = document.getElementById("progress-text");
    let progressFill = document.getElementById("progress-fill");
    let clipsContainer = document.getElementById("clips-container");
    let thumbnailContainer = document.getElementById("thumbnail-container");

    if (!url || !duration) {
        alert("Masukkan URL dan durasi clip!");
        return;
    }

    loading.classList.remove("hidden");
    progressText.innerText = "0%";
    progressFill.style.width = "0%";

    for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        progressText.innerText = i + "%";
        progressFill.style.width = i + "%";
    }

    let videoId = url.split("v=")[1] || url.split("/").pop();
    let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    thumbnailContainer.innerHTML = `<img src="${thumbnailUrl}" class="thumbnail">`;

    let response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Buat daftar 5 cuplikan menarik dari video ini: ${url}. Durasi clip sekitar ${duration} detik. Berikan waktu mulai dan judulnya.`,
            max_tokens: 100
        })
    });

    let data = await response.json();
    let clips = data.choices[0].text.trim().split("\n");

    clipsContainer.innerHTML = "";
    clips.forEach((clip, index) => {
        let [start, title] = clip.split(" - ");
        let videoSrc = `https://www.youtube.com/embed/${videoId}?start=${start}&end=${parseInt(start) + parseInt(duration)}`;

        let clipElement = `
            <div class="clip">
                <h3>${title}</h3>
                <iframe width="100%" height="200" src="${videoSrc}" frameborder="0" allowfullscreen></iframe>
                <button class="download-btn" onclick="downloadClip('${videoSrc}')">Download</button>
            </div>
        `;

        clipsContainer.innerHTML += clipElement;
    });

    loading.classList.add("hidden");
}

function downloadClip(videoSrc) {
    let link = document.createElement("a");
    link.href = videoSrc;
    link.download = "clip.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}