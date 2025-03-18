const apiKey = "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"; // Ganti dengan API Key OpenAI

document.getElementById("generateBtn").addEventListener("click", async () => {
    const videoUrl = document.getElementById("videoInput").value;
    if (!videoUrl) {
        alert("Masukkan URL YouTube dulu!");
        return;
    }

    document.getElementById("loadingBar").classList.remove("hidden");
    updateProgress(10);

    const videoId = getYouTubeVideoId(videoUrl);
    if (!videoId) {
        alert("URL YouTube tidak valid!");
        return;
    }

    // Tampilkan thumbnail
    document.getElementById("videoThumbnail").src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    document.getElementById("thumbnailPreview").classList.remove("hidden");
    updateProgress(30);

    // Ambil transkripsi video (contoh: pakai eksternal API YouTube)
    const transcript = await fetchTranscript(videoId);
    updateProgress(50);

    // Kirim ke OpenAI untuk cari momen terbaik
    const clips = await getBestMoments(transcript);
    updateProgress(80);

    // Tampilkan hasil clips
    displayClips(clips, videoId);
    updateProgress(100);
});

// Ambil video ID dari URL YouTube
function getYouTubeVideoId(url) {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
    return match ? match[1] : null;
}

// Contoh fungsi untuk mengambil transkripsi video
async function fetchTranscript(videoId) {
    return "Ini adalah contoh transkripsi video yang nantinya diambil dari API YouTube.";
}

// Gunakan OpenAI API untuk memilih momen terbaik
async function getBestMoments(transcript) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: `Dari transkripsi ini: ${transcript}, pilih 5 momen terbaik beserta waktu dan buatkan judulnya.` }]
        })
    });

    const data = await response.json();
    return parseMomentsFromGPT(data.choices[0].message.content);
}

// Parsing hasil dari OpenAI
function parseMomentsFromGPT(responseText) {
    // Contoh format keluaran dari OpenAI
    return [
        { time: "00:01:30", title: "Momen Seru Awal" },
        { time: "00:03:45", title: "Puncak Ketegangan" },
        { time: "00:06:20", title: "Twist Tak Terduga" },
        { time: "00:08:15", title: "Aksi Memukau" },
        { time: "00:10:05", title: "Akhir Epik" }
    ];
}

// Menampilkan clips di halaman
function displayClips(clips, videoId) {
    const clipsContainer = document.getElementById("clipsContainer");
    const clipsList = document.getElementById("clipsList");

    clipsContainer.classList.remove("hidden");
    clipsList.innerHTML = "";

    clips.forEach((clip, index) => {
        const clipElement = document.createElement("div");
        clipElement.innerHTML = `
            <h3>${clip.title}</h3>
            <a href="https://www.youtube.com/watch?v=${videoId}&t=${clip.time.replace(":", "")}s" target="_blank">
                Tonton Momen (${clip.time})
            </a>
        `;
        clipsList.appendChild(clipElement);
    });
}

// Update progress loading bar
function updateProgress(percent) {
    document.getElementById("progressPercent").innerText = `${percent}%`;
    document.getElementById("progressFill").style.width = `${percent}%`;
}
